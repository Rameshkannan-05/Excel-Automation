import pandas as pd
import os
import numpy as np  # For np.nan checks

# Store uploaded data in memory per session
DATA_STORE = {}

def load_and_clean(file_paths, session_id="default"):
    dfs = []
    for path in file_paths:
        try:
            # Skip the first 4 junk rows; treat Row 5 as header, Row 6+ as data
            df = pd.read_excel(path, skiprows=4, header=0)
            
            print(f"Raw DataFrame shape: {df.shape}")  # Expected: (30, 11) for your file
            print(f"Raw columns: {df.columns.tolist()}")  # Expected: ['Sr.No.', 'WELD POINT', 'X', ...]
            
            # Step 1: Safely convert all column names to strings, handling NaN/floats/empties
            new_columns = []
            for i, col in enumerate(df.columns):
                col_str = str(col).strip() if not pd.isna(col) else f"unnamed_col_{i}"
                if col_str == '':  # Handle empty strings
                    col_str = f"unnamed_col_{i}"
                new_columns.append(col_str)
            df.columns = new_columns
            
            print(f"Columns after string conversion: {df.columns.tolist()}")
            
            # Step 2: Drop any entirely empty or unnamed columns (cleanup)
            df = df.dropna(axis=1, how='all')
            # Drop columns that are all NaN or unnamed if they don't match expected
            df = df.loc[:, ~df.columns.str.contains('unnamed_col', na=False)]
            print(f"Columns after dropping empties/unnamed: {df.columns.tolist()}")
            
            # Step 3: Standardize column names: lowercase, replace spaces/dots/periods with underscores
            df.columns = df.columns.str.lower().str.replace(' ', '_').str.replace('.', '_').str.replace('-', '_')
            
            print(f"Standardized columns: {df.columns.tolist()}")  # Expected: ['sr_no', 'weld_point', 'x', ...]
            
            # Step 4: Ensure key columns are correctly named (fallback if slight variations)
            column_mapping = {
                'sr_no': 'sr_no',
                'weld_point': 'weld_point',
                'x': 'x',
                'y': 'y',
                'z': 'z',
                'rel': 'rel',
                'description': 'description',
                'size': 'size',
                'material': 'material',
                'manufacturer': 'manufacturer',
                'note': 'note'
            }
            # Rename based on fuzzy match if exact not present
            for target, source_candidates in {
                'weld_point': ['weld_point', 'weld', 'point'],
                'description': ['description', 'desc'],
                'sr_no': ['sr_no', 'sr.no', 'serial'],
                'rel': ['rel', 'rel.'],
            }.items():
                if target not in df.columns:
                    for col in df.columns:
                        if any(candidate in str(col).lower() for candidate in source_candidates):
                            df = df.rename(columns={col: target})
                            print(f"Renamed '{col}' to '{target}'")
                            break
            
            # Step 5: Clean data: Strip strings, fill NaN in string columns with empty str for matching
            for col in df.columns:
                if df[col].dtype == 'object':  # String-like columns
                    df[col] = df[col].astype(str).str.strip().replace('nan', '')  # Handle 'nan' strings too
                else:
                    # For numerics, leave as-is (weld_point might be numeric, but we'll str() in search)
                    pass
            
            # Fill remaining NaN with empty for consistency
            df = df.fillna('')
            
            print(f"Final DataFrame shape: {df.shape}")  # Expected: (30, 11)
            print(f"Final columns: {df.columns.tolist()}")
            print(f"First few rows (sample):\n{df.head().to_string()}")  # Check: Row 1 description should be 'Drawing Number/Order Number'
            print(f"Sample row 3 (for weld point 3):\n{df[df['weld_point'] == '3'].to_string() if 'weld_point' in df.columns else 'No weld_point column'}")
            
            if df.empty or 'weld_point' not in df.columns:
                raise ValueError("DataFrame is empty or missing key columns after processing. Check file structure.")
            
            dfs.append(df)
            
        except Exception as e:
            print(f"Error processing file {path}: {e}")
            raise ValueError(f"Failed to load file {path}: {str(e)}")
        
        # Clean up temp file
        try:
            os.remove(path)
            print(f"Deleted temp file: {path}")
        except Exception as e:
            print(f"Could not delete {path}: {e}")
    
    if not dfs:
        raise ValueError("No valid data loaded from files.")
    
    combined_df = pd.concat(dfs, ignore_index=True)
    DATA_STORE[session_id] = combined_df
    print(f"Stored {len(combined_df)} rows in session '{session_id}'")  # Expected: 30
    return combined_df

def search_data(session_id="default", weld_point=None, description=None):
    if session_id not in DATA_STORE:
        raise ValueError("No data for this session. Upload a file first.")
    
    df = DATA_STORE[session_id]
    print(f"Searching in DataFrame with {len(df)} rows and columns: {df.columns.tolist()}")  # Expected: 30 rows
    
    results = df.copy()

    # Exact match filtering (convert to str for comparison, handle empties)
    if weld_point is not None:
        weld_point_str = str(weld_point).strip()
        print(f"Filtering weld_point == '{weld_point_str}'")  # e.g., '3'
        if 'weld_point' in results.columns:
            results = results[results['weld_point'].astype(str) == weld_point_str]
        else:
            print("Warning: 'weld_point' column not found during search.")
            return []
    
    if description is not None:
        description_str = str(description).strip()
        print(f"Filtering description == '{description_str}'")
        if 'description' in results.columns:
            results = results[results['description'].astype(str) == description_str]
        else:
            print("Warning: 'description' column not found during search.")
            return []

    rows = results.to_dict(orient="records")
    print(f"Found {len(rows)} matching rows")  # Expected: 1 for "weld point: 3"

    # Replace empty/NaN with None for JSON (but since we filled '', convert '' to None if needed)
    for row in rows:
        for k, v in row.items():
            if pd.isna(v) or v == '':
                row[k] = None

    return rows
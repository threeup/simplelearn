# importing os module 
import os 
  
# Function to rename multiple files 
def main(): 
    directory = "./assets/restaurant"
    for count, filename in enumerate(os.listdir(directory)): 
        chunks = filename.split('-')
        dst = chunks[1].replace(' ','_').lower()
        src = os.path.join(directory,filename)
        dst = os.path.join(directory,dst)
          
        # rename() function will 
        # rename all the files 
        os.rename(src, dst) 
  
# Driver Code 
if __name__ == '__main__': 
      
    # Calling main() function 
    main() 
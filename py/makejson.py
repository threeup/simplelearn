import os 
import json
  
def main(): 
    directory = "./assets/objects"
    data = {}
    data['elements'] = []
    for count, filename in enumerate(os.listdir(directory)): 
        chunks = filename.split('.')
        target = chunks[0].replace(' ','_').lower()
        data['elements'].append({
            "text": target,
            "img": os.path.join(directory,filename)
        })
    with open('./assets/objectdata.json', 'w') as outfile:
        json.dump(data, outfile, indent=2)
        
  
# Driver Code 
if __name__ == '__main__': 
      
    # Calling main() function 
    main() 
import os 
import json


def main():
    writeFont("splitfont")
    result = "./targetwords/targetwords.json"
    directory = "./targetwords"
    data = {}
    data['categories'] = []
    list_dir = sorted(os.listdir(directory))
    for count, filename in enumerate(list_dir): 
        chunks = filename.split('.')
        if len(chunks) == 1:
            category = chunks[0]
            writeCategory(category)
            data['categories'].append({
                "text": category,
            })
    with open(result, 'w') as outfile:
        json.dump(data, outfile, indent=2)

def writeCategory(category): 
    result = "./targetwords/"+category+"data.json"
    directory = "./targetwords/"+category+"/"
    data = {}
    data['elements'] = []
    list_dir = sorted(os.listdir(directory))
    for count, filename in enumerate(list_dir): 
        chunks = filename.split('.')
        target = chunks[0].replace(' ','_').lower()
        data['elements'].append({
            "text": target,
            "img": os.path.join(directory,filename)
        })
    with open(result, 'w') as outfile:
        json.dump(data, outfile, indent=2)
        
def writeFont(font):
    result = "./assets/"+font+"data.json"
    directory = "./assets/"+font+"/"
    data = {}
    data['elements'] = []
    for count, filename in enumerate(os.listdir(directory)): 
        chunks = filename.split('.')
        target = chunks[0].replace(' ','_').lower()
        data['elements'].append({
            "text": target,
            "img": os.path.join(directory,filename)
        })
    with open(result, 'w') as outfile:
        json.dump(data, outfile, indent=2)

  
# Driver Code 
if __name__ == '__main__': 
    main() 
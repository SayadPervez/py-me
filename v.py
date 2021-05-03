import sys
import os

try:
  import numpy
except Exception as e:
  os.system("pip install numpy")
  
try:
  import scipy
except Exception as e:
  os.system("pip install scipy")

def validate(code):
    with open("allowed_modules.csv","r") as f:
        permittedModules=(f.read()).split(",")          # contains permitted modules
    lines=code.split("\n")                              # contains all lines of code
    importLines=[_ for _ in lines if "import" in _]     # contains all lines with import statement
    importModules=[]                                    # contains imported modules
    for _ in importLines:
        temp=_.replace("import ","")
        temp=temp.replace(" ","")
        if("," in temp):
            importModules+=temp.split(",")
        else:
            importModules.append(temp)
    violatedModules=[]                                  # contains violated modules
    for _ in importModules:
        if(_ in permittedModules):
            pass
        else:
            violatedModules.append(_)
    if(len(violatedModules)==0):
        return("$-SUCCESS-$")
    else:
        return(','.join(violatedModules))

if(len(sys.argv)>0):
  print(validate(sys.argv[1]))
else:
  print("Looks like u forgot to send me the py code")
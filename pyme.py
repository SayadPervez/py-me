import sys

def do(code):
  try:
    exec(code)
  except Exception as e:
    print("error:\t"+str(e))

if(len(sys.argv)>0):
  do(sys.argv[1])
else:
  print("Looks like u forgot to send me the py code")
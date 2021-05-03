import sys

banned_words = ["os.sys","rmdir","subprocess","allowed_modules.csv","package.json","pyme.py","server.js","v.py","vx.py","clear.py","index.html","script.js","style.css","sleep","exec","eval"]

def validate(s):
  flag=True
  for _ in banned_words:
    if(_ in s):
      print(_)
      flag=False
  if(flag):
    print("$-SUCCESS-$")

if(len(sys.argv)>0):
  validate(sys.argv[1])
else:
  print("Looks like u forgot to send me the py code")
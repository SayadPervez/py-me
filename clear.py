import os
def diffList(li1, li2):
    li_dif = [i for i in li1 + li2 if i not in li1 or i not in li2]
    return li_dif
default_files=['vx.py','node_modules', '.data', 'allowed_modules.csv','.cache','.python_history', '.git', '.config', 'pyme.py', '.nano', 'package-lock.json', '.glitch-assets', 'shrinkwrap.yaml', 'server.js', 'clear.py', '.bash_history', '.node-gyp', 'package.json', 'views', '.glitchdotcom.json', 'v.py']
del_list=diffList(os.listdir(),default_files)

for _ in del_list:
  try:
    os.remove(_)
  except Exception as e:
    print(str(e))
import sys
import json

def gettime(timeanddate):
  return timeanddate[11:16]
def samelocation(previous, current):
  plat = previous['latitude']
  plng = previous['longitude']
  clat = current['latitude']
  clng = current['longitude']
  if(plat==clat and plng == clng):
    return True
  else:
    return False
def mapfunction(data):
  response = []
  data = data['data']
  previousRow = ''
  curpath = []
  curtype = ''
  starttime = ''
  endtime = ''
  startvol = 0
  endvolume = 0
  volumeadded = 0
  volumeused = 0
  if len(data) > 0:
    for row in data:
      if previousRow != '':
        if (samelocation(previousRow, row) and (curtype == 'stop' or curtype == '')):
          curtype = 'stop'
        elif (samelocation(previousRow, row) and curtype == 'moving'):
          curpath.append({'lat': float(row['latitude']), 'lng': float(row['longitude'])})
          response.append({'type': curtype, 'path': curpath, 'starttime': starttime, 'endtime': endtime, 'voa': startvol, 'vol': endvolume, 'va': volumeadded, 'vu': volumeused})
          startvol = float(previousRow['volume_left'])
          volumeadded = 0
          volumeused = 0
          curpath = [{'lat': float(row['latitude']), 'lng': float(row['longitude'])}]
          starttime = gettime(row['created_at'])
          curtype = 'stop'
        elif ((not(samelocation(previousRow, row))) and (curtype == 'moving' or curtype == '')):
          curtype = 'moving'
          curpath.append({'lat': float(row['latitude']), 'lng': float(row['longitude'])})
        elif ((not(samelocation(previousRow, row))) and curtype == 'stop'):
          curpath.append({'lat': float(row['latitude']), 'lng': float(row['longitude'])})
          response.append({'type': curtype, 'path': curpath, 'starttime': starttime, 'endtime': endtime, 'voa': startvol, 'vol': endvolume, 'va': volumeadded, 'vu': volumeused})
          startvol = float(row['volume_left'])
          volumeadded = 0
          volumeused = 0
          curpath = [{'lat': float(row['latitude']), 'lng': float(row['longitude'])}]
          starttime = gettime(row['created_at'])
          curtype = 'moving'
      else:
        starttime = gettime(row['created_at'])
        startvol = float(row['volume_left'])
        curpath.append({'lat': float(row['latitude']), 'lng': float(row['longitude'])})
      volumeadded += float(row['volume_added'])
      volumeused += float(row['volume_used'])
      endvolume = float(row['volume_left'])
      endtime = gettime(row['created_at'])
      previousRow = row
    curpath.append({'lat': float(row['latitude']), 'lng': float(row['longitude'])})
    response.append({'type': curtype, 'path': curpath, 'starttime': starttime, 'endtime': endtime, 'voa': startvol, 'vol': endvolume, 'va': volumeadded, 'vu': volumeused})
    return response
  else:
    return []

dataFromNode = sys.argv[1]

dataFromNode = json.loads(dataFromNode)

formattedMapData = mapfunction(dataFromNode)
formattedMapData = json.dumps(formattedMapData)
print(formattedMapData)

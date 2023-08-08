# This views file is responsible for making DB calls
# In this template has only one function 'testAPI' but in a more complex app it will have one function per DB collection/api endpoint.
# Each view function take a request as argument and, depending on the request method, applies some CRUD operations.

from django.views.decorators.csrf import csrf_exempt
from json import loads
from api.utils import collection
from django.http.response import JsonResponse
from bson.objectid import ObjectId

@csrf_exempt
def testApi(request):
  print(request)
  if request.method == 'GET':
    messages = collection.find({})
    convertedMessages = objectIdConverter(list(messages))
    return JsonResponse(convertedMessages,safe=False)
  
  if request.method == 'POST':
    data = request.body
    parsedData = loads(data)
    collection.insert_one(parsedData)
    messages = collection.find({})
    convertedMessages = objectIdConverter(list(messages))
    return JsonResponse(convertedMessages,safe=False)

  if request.method == 'PUT':
    data = request.body
    parsedData = loads(data)
    id = parsedData['id']
    collection.find_one_and_update({
      '_id':ObjectId(f'{id}')},
      {
        '$set': {
          'message': parsedData['message'],
        }
      }, upsert = True)
    messages = collection.find({})
    convertedMessages = objectIdConverter(list(messages))
    return JsonResponse(convertedMessages,safe=False)
  
  if request.method == 'DELETE':
    data = request.body
    parsedData = loads(data)['id']
    collection.find_one_and_delete({'_id':ObjectId(f'{parsedData}')})
    messages = collection.find({})
    convertedMessages = objectIdConverter(list(messages))
    return JsonResponse(convertedMessages,safe=False)


# Object id conversion function

def objectIdConverter(lists):
  for item in lists :
    item['_id'] = str(item['_id'])
  return lists

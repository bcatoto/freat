from flask import request, json, Response, Blueprint
from ..CASClient import CASClient
from ..models.AttendingModel import AttendingModel, AttendingSchema

attending_api = Blueprint('attendance', __name__)
attending_schema = AttendingSchema()

@attending_api.route('/', methods=['GET'])
def getUserGoingPosts():
    CASClient().authenticate()
    val = request.args.get('userid')
    try:
        if val is not None:
            posts =  AttendingModel.get_user_going_posts(val)
            data = attending_schema.dump(posts, many=True)
            return custom_response(data, 200)
    except Exception as err:
        return custom_response({'message': err}, 400)
    return custom_response({}, 200)


@attending_api.route('/', methods=['POST'])
def going():
    """
    Update that user is going to an event/posting
    """
    CASClient().authenticate()
    req_data = request.get_json()
    print(req_data)
    try:
        data = attending_schema.load(req_data['data'])
        ### verify the user is not already signed up for the event
        attending = AttendingModel.get_single_attending(data['user_id'], data['post_id'])
        if attending is not None:
            return custom_response({'message':'userid is already signed up for the correspdoning postid'}, 403)

        attending = AttendingModel(data)
        attending.save()
        return custom_response({'message':'successfully added'}, 200)
    except Exception as err:
        return custom_response({'message': err}, 400)


@attending_api.route('/', methods=['DELETE'])
def notgoing():
    """
    Update that user is not going to an event/posting
    """
    CASClient().authenticate()
    req_data =request.get_json()
    print(req_data)
    try:
        data = attending_schema.load(req_data['data'])
        ### verify that the user is signed up for the event
        attending = AttendingModel.get_single_attending(data['user_id'], data['post_id'])
        if attending is None:
            return custom_response({'message':'userid is not signed up for the correspdoning postid'}, 403)
        
        attending.delete()
        return custom_response({'message':'successfully deleted'}, 204)
    except Exception as err:
        return custom_response({'message': err}, 400)

def custom_response(res, status_code):
  """
  Custom Response Function
  """
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )

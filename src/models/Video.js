import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: 'File URL is requried'
  },
  title: {
    type: String,
    required: 'Title is required'
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  /* Comment.js의 커맨트 아이디 배열을 만들어서 서로연결 시켜주는 것
     따라서 댓글 수를 알고자 할때 배열의 길이 comments.length로 아는 것이다.  */
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const model = mongoose.model('Video', VideoSchema);

export default model;

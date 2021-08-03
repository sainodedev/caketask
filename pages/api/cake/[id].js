// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../../utils/dbConnection';
import Cake from '../../../models/cakes';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query
  switch (method) {
    case 'GET':
      try {
        const cakes = await Cake.findById({_id:id});
        res.status(200).json({ success: true, data: cakes })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        if (id){
          const cake = await Cake.deleteOne({_id:id});
          res.status(200).json({ success: true, data: cake })
        }else{
          throw Error('id is required and it should be alphanumeric')
        }
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false , error: error.message});
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../utils/dbConnection';
import Cake from '../../models/cakes';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const cakes = await Cake.find({});

        res.status(200).json({ success: true, data: cakes })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        if (req.body && typeof req.body == 'object'){
          const cake = await Cake.create(req.body);
          res.status(201).json({ success: true, data: cake })
        }else{
          throw Error('Body is required and it should be object')
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

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../utils/dbConnection';
import Cart from '../../models/cart';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const carts = await Cart.find({});

        res.status(200).json({ success: true, data: carts })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        if (req.body && typeof req.body == 'object'){
          const cart = await Cart.create(req.body);
          res.status(201).json({ success: true, data: cart })
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

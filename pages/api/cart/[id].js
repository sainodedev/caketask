// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../../utils/dbConnection';
import Cart from '../../../models/cart';

dbConnect();

export default async (req, res) => {
  const { method,body } = req;
  const { id } = req.query
  switch (method) {
    case 'GET':
      try {
        const cart = await Cart.find({cartId:id});
        res.status(200).json({ success: true, data: cart[0] })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        if (id){
          let requestBody = JSON.parse(body)
          const cart = await Cart.updateOne({cartId:id},{cartData: requestBody.cartData},{new:true});
          res.status(200).json({ success: true, data: cart })
        }else{
          throw Error('id is required and it should be alphanumeric')
        }
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false , error: error.message});
      }
      break;
      case 'DELETE':
        try {
          if (id){
            const cart = await Cart.deleteOne({_id:id});
            res.status(200).json({ success: true, data: cart })
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
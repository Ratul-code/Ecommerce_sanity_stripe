import Stripe from "stripe"
// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method === 'POST') {
      const cartItems = req.body
    try {
      const params = {
          submit_type:'pay',
          mode:'payment',
          payment_method_types:['card'],
          billing_address_collection:"auto",
          shipping_options:[
              {shipping_rate:'shr_1Kw7ELBXvkqTLrS77IR9rOSE',},
              {shipping_rate:'shr_1Kw7FXBXvkqTLrS7IQ1Iba3a',}
            ],
        line_items:cartItems.map((item)=>{
            const img = item.image[0].asset._ref;
            const newImg = img.replace("image-","https://cdn.sanity.io/images/ry53na2p/production/").replace("-webp",".webp")
            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name,
                        images:[newImg]
                    },
                    unit_amount:item.price*100
                },
                adjustable_quantity:{
                    enabled:true,
                    minimum:1,
                },
                    quantity:item.quantity
                }
        }) ,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }
      console.log("done")
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
        console.log("here45")
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
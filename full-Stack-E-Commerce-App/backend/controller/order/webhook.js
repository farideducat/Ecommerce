const stripe = require('../../config/stripe')
const orderModel = require('../../models/orderProductModel')

const endpointSecret =  process.env.STRIPE_ENDPOINT_WEBHOOKS_SECRET_KEY

async function getLineItems(lineItems){
  let productItems =[]

  if(lineItems?.data?.length){
    for(const item of lineItems?.data){
        const product = await stripe.products.retrive(item.price.product)
        const productId = product.metaData.productId

        const productData = {
            productId : productId,
            name : product.name,
            proce : item.price.unit_amount / 100,
            quantity : item.quantity,
            image : product.image
        }
        productItems.push(productData)
         
        const orderDetails = {

        }
        const order = new orderModel(orderDetails)
        const saveOrder = await order.save()

    }
  }
  return productItems
}

const webhooks = async(request,response)=>{
 const signature = request.headers['stripe-signature'];

 const payloadString = JSON.stringify(request.body)
    
  const header = stripe.webhooks.generateTestHeadersString({
    payload : payloadString,
    secret : endpointSecret,
  })
 let event 
  try {
      event = stripe.webhooks.constructEvent(payloadString,header, endpointSecret);
    } catch (err) {
      response.sendStatus(400)(`Webhook signature verification failed. ${err.message}`)
      return 
    }

    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const  session = event.data.object;

      const lineItems  = await stripe.checkout.sessions.listLineItems(session.id)
       const ProductDetails = await getLineItems(lineItems)


      break;
    case 'payment_method.attached':
      const sessions = event.data.object;
     
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  response.status(200).send();

}

module.exports = webhooks

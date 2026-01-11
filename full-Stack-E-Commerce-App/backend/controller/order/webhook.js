const stripe = require('../../config/stripe');
const orderModel = require('../../models/orderProductModel');
const addToCartModel = require('../../models/cartProduct')

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOKS_SECRET_KEY;


async function getLineItems(lineItems) {
    let productItems = [];

    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {

            const product = await stripe.products.retrieve(item.price.product);
            
      
            const productId = product.metadata.productId;

            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount / 1000,
                quantity: item.quantity,
                image: product.images


            };
            console.log("productitems",product)
            productItems.push(productData);
        }
    }
    return productItems;
}

const webhooks = async (request, response) => {
    // 1. Get the signature from the headers
    const sig = request.headers['stripe-signature'];

    // 2. The payload MUST be the raw body (Buffer) from index.js
    const payload = request.body;

    let event;

    try {
        // 3. Verify the event actually came from Stripe
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        console.error(`❌ Webhook Error: ${err.message}`);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // 4. Handle the specific event type
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            try {
                // Fetch the detailed line items for this specific session
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                const ProductDetails = await getLineItems(lineItems);
                 
                console.log("Stripe Shipping Cost:", session.shipping_cost);
                const orderDetails = {
                    ProductDetails: ProductDetails,
                    email: session.customer_email,
                    userId: session.metadata.userId,
                    paymentDetails: {
                        paymentId: session.payment_intent,
                        payment_method_type: session.payment_method_types,
                        payment_status: session.payment_status,
                    },
                     
                        shipping_options: session.shipping_cost ? [
                            {
                            shipping_amount: session.shipping_cost.amount_total / 1000 // Dividing by 1000 for OMR
                             }
                          ] : [],

                    total_amount: session.amount_total / 1000
                };
                console.log("Final Object to Save:", orderDetails);

                // 5. Save the order to MongoDB
                const order = new orderModel(orderDetails);
                const saveOrder = await order.save();

                if(saveOrder?._id){
                    const deleteCartItems = await addToCartModel.deleteMany({ userId : session.metadata.userId })

                }
                
                

            } catch (error) {
                console.error("❌ Error processing order save:", error.message);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}.`);
    }

    // 6. Return a 200 response to acknowledge receipt of the event
    response.status(200).send();
};

module.exports = webhooks;
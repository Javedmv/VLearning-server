
export default async (data:any) => {
    try {
        console.log("edit user consumer in payment: ", data);
    } catch (error:any) {
        console.log("edit user consumer in payment error: ", error?.message);
    }
}
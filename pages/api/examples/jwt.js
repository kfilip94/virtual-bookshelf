// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'

const secret = process.env.SECRET;

export default async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  console.log('JSON Web Token: ',token)
//res.send(JSON.stringify(token))
  res.send(token)
  res.end()
  // let accessToken = null;
  // if (token) {
  //   const jwtJSON = await token.json();
  //   accessToken = jwtJSON.account.accessToken;
  // }
  
  // console.log('accessToken: ',{accessToken}); 
  // res.send(jwtJSON)
}
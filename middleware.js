import geoip from 'geoip-lite'

export const config = {
  matcher: '/admin',
}

// const ALLOWED_COUNTRIES = ['CN', 'HK']

export default function middleware(request) {
  const url = new URL(request.url)

  //   if (url.pathname === '/admin')
  //     url.pathname = '/redirected'
  const ip = request.headers.get('x-real-ip')
  console.log(ip)
  
  const geo = geoip.lookup(ip)
  console.log(geo)

  if (!['CN', 'HK'].includes('CN'))
    console.log('asdfasdf')

  url.pathname = '/redirected'
  return Response.redirect(url)
}

// export const config = {
//     matcher: '/*',
//   }

//   const ALLOWED_COUNTRIES = ['CN', 'HK']

//   export default function middleware(request) {
//     const url = new URL(request.url)

//     const country = request.geo.country || 'CN'

//     if (!ALLOWED_COUNTRIES.includes(country))
//       url.pathname = '/blocked'

//     return Response.redirect(url)
//   }

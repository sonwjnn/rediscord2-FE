const fs = require('fs')
const path = require('path')
const https = require('https')
const { URL } = require('url')

// Tạo thư mục để lưu các file SVG
const downloadDir = path.join(process.cwd(), 'svg-downloads')
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir)
  console.log('Đã tạo thư mục svg-downloads')
}

// Trích xuất danh sách đường dẫn SVG từ nội dung
const svgUrls = [
  '/shapes/solid/badge.svg',
  '/shapes/solid/circles.svg',
  '/shapes/solid/explosion.svg',
  '/shapes/solid/house.svg',
  '/shapes/solid/four-point-star.svg',
  '/shapes/solid/cloud.svg',
  '/shapes/solid/pear.svg',
  '/shapes/solid/pill.svg',
  '/shapes/solid/tear-vertical.svg',
  '/shapes/solid/blob-1.svg',
  '/shapes/solid/blob-2.svg',
  '/shapes/solid/blob-3.svg',
  '/shapes/solid/blob-4.svg',
  '/shapes/solid/blob-5.svg',
  '/shapes/solid/blob-6.svg',
  '/shapes/solid/blob-7.svg',
  '/shapes/solid/a-phone.svg',
  '/shapes/solid/at-symbol.svg',
  '/shapes/solid/device-mobile.svg',
  '/shapes/solid/flag.svg',
  '/shapes/solid/lines-left.svg',
  '/shapes/solid/lines-right.svg',
  '/shapes/solid/location-marker.svg',
  '/shapes/solid/mail.svg',
  '/shapes/solid/noun_Bacteria_3910626.svg',
  '/shapes/solid/noun_Circle_3910605.svg',
  '/shapes/solid/noun_Cross_3910611.svg',
  '/shapes/solid/noun_Crown_3910654.svg',
  '/shapes/solid/noun_Crown_3910824.svg',
  '/shapes/solid/noun_Flower_3910613.svg',
  '/shapes/solid/noun_Flower_3910622.svg',
  '/shapes/solid/noun_Flower_3910624.svg',
  '/shapes/solid/noun_Flower_3910631.svg',
  '/shapes/solid/noun_Flower_3910643.svg',
  '/shapes/solid/noun_Flower_3910650.svg',
  '/shapes/solid/noun_Flower_3910656.svg',
  '/shapes/solid/noun_Flower_3910816.svg',
  '/shapes/solid/noun_Heart_3910636.svg',
  '/shapes/solid/noun_Hendecagon_3910647.svg',
  '/shapes/solid/noun_Heptagon_3910661.svg',
  '/shapes/solid/noun_Hexagon_3910637.svg',
  '/shapes/solid/noun_Hexagon_3910657.svg',
  '/shapes/solid/noun_House_3910635.svg',
  '/shapes/solid/noun_Magnet_3910655.svg',
  '/shapes/solid/noun_Moon_3910819.svg',
  '/shapes/solid/noun_Nonagon_3910640.svg',
  '/shapes/solid/noun_Oval_3910634.svg',
  '/shapes/solid/noun_Pentagon_3910617.svg',
  '/shapes/solid/noun_Ring_3910638.svg',
  '/shapes/solid/noun_Rounded Star_3910618.svg',
  '/shapes/solid/noun_Shield_3910646.svg',
  '/shapes/solid/noun_Shield_3910659.svg',
  '/shapes/solid/noun_Shield_3910669.svg',
  '/shapes/solid/noun_Star_3910607.svg',
  '/shapes/solid/noun_Star_3910608.svg',
  '/shapes/solid/noun_Star_3910616.svg',
  '/shapes/solid/noun_Star_3910620.svg',
  '/shapes/solid/noun_Star_3910623.svg',
  '/shapes/solid/noun_Star_3910627.svg',
  '/shapes/solid/noun_Star_3910639.svg',
  '/shapes/solid/noun_Star_3910823.svg',
  '/shapes/solid/noun_Starburst_3910648.svg',
  '/shapes/solid/noun_Starburst_3910820.svg',
  '/shapes/solid/noun_Trapezium_3910822.svg',
  '/shapes/solid/noun_arch_3910610.svg',
  '/shapes/solid/noun_arch_3910666.svg',
  '/shapes/solid/noun_blob_3910649.svg',
  '/shapes/solid/noun_blob_3910651.svg',
  '/shapes/solid/noun_blob_3910665.svg',
  '/shapes/solid/noun_circular shape_3910663.svg',
  '/shapes/solid/noun_cog_3910619.svg',
  '/shapes/solid/noun_cog_3910628.svg',
  '/shapes/solid/noun_cog_3910668.svg',
  '/shapes/solid/noun_column_3910632.svg',
  '/shapes/solid/noun_crescent_3910814.svg',
  '/shapes/solid/noun_curve_3910660.svg',
  '/shapes/solid/noun_double arch_3910629.svg',
  '/shapes/solid/noun_interlocking circles_3910817.svg',
  '/shapes/solid/noun_octagon_3910609.svg',
  '/shapes/solid/noun_paint splatter_3910653.svg',
  '/shapes/solid/noun_quatrefoil_3910821.svg',
  '/shapes/solid/noun_shape_3910612.svg',
  '/shapes/solid/noun_shape_3910621.svg',
  '/shapes/solid/noun_shape_3910670.svg',
  '/shapes/solid/noun_splash_3910645.svg',
  '/shapes/solid/noun_stadium_3910818.svg',
  '/shapes/solid/noun_triangle_3910625.svg',
  '/shapes/solid/noun_unique shape_3910633.svg',
  '/shapes/solid/noun_unique shape_3910644.svg',
  '/shapes/solid/noun_vase_3910641.svg',
  '/shapes/solid/noun_wave_3910662.svg',
  '/shapes/solid/noun_waves_3910642.svg',
  '/shapes/solid/noun_wavy_3910652.svg',
  '/shapes/solid/noun_wavy_3910815.svg',
  '/shapes/solid/noun_zig zag_3910658.svg',
  '/shapes/solid/noun_zig zag_3910813.svg',
]

// Cài đặt thông tin host - thay đổi baseUrl này theo domain của bạn
const baseUrl = 'https://logo.com' // Bạn cần thay đổi URL này thành domain thực tế

// Function để tải một file SVG
function downloadSvg(url, filename) {
  return new Promise((resolve, reject) => {
    const fullUrl = new URL(url, baseUrl)

    https
      .get(fullUrl, response => {
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Không thể tải ${url}, status code: ${response.statusCode}`,
            ),
          )
          return
        }

        const filePath = path.join(downloadDir, filename)
        const fileStream = fs.createWriteStream(filePath)

        response.pipe(fileStream)

        fileStream.on('finish', () => {
          fileStream.close()
          console.log(`Đã tải thành công: ${filename}`)
          resolve()
        })

        fileStream.on('error', err => {
          fs.unlink(filePath, () => {}) // Xóa file nếu có lỗi
          reject(err)
        })
      })
      .on('error', err => {
        reject(err)
      })
  })
}

// Lập kế hoạch tải tất cả các file
async function downloadAllSvgs() {
  console.log(
    `Bắt đầu tải ${svgUrls.length} file SVG về thư mục: ${downloadDir}`,
  )
  console.log(
    `Lưu ý: Đảm bảo bạn đã thay đổi baseUrl trong script thành domain chính xác.`,
  )

  let downloaded = 0
  let failed = 0

  for (const url of svgUrls) {
    const filename = path.basename(url)
    try {
      await downloadSvg(url, filename)
      downloaded++
    } catch (error) {
      console.error(`Lỗi khi tải ${url}: ${error.message}`)
      failed++
    }
  }

  console.log(`\nHoàn thành!`)
  console.log(`- Đã tải thành công: ${downloaded} file SVG`)
  console.log(`- Thất bại: ${failed} file`)
  console.log(`- Thư mục lưu: ${downloadDir}`)
}

// Chạy chương trình
downloadAllSvgs().catch(console.error)

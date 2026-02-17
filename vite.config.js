import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ဒီစာကြောင်းကို ပြင်ပေးပါ
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Wallet Flow - စာရင်းကိုင် App',
        short_name: 'WalletFlow',
        description: 'ကိုယ်ပိုင် ဝင်ငွေ ထွက်ငွေ စာရင်းကိုင် App',
        theme_color: '#6c5ce7',
        background_color: '#f0f2f5',
        display: 'standalone', // ဒါက App တစ်ခုလို ပွင့်လာအောင် လုပ်ပေးတာပါ
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  resolve:{
alias:{
  "@assets":path.resolve(__dirname,"./src/assets"),
    "@components":path.resolve(__dirname,"./src/components"),
      "@pages":path.resolve(__dirname,"./src/pages"),
  "@hooks":path.resolve(__dirname,"./src/hooks"),
    "@layouts":path.resolve(__dirname,"./src/layouts"),
      "@routes":path.resolve(__dirname,"./src/routes"),
  "@store":path.resolve(__dirname,"./src/store"),
    "@style":path.resolve(__dirname,"./src/style"),
      "@typeCustome":path.resolve(__dirname,"./src/typeCustome"),
            "@util":path.resolve(__dirname,"./src/util"),
            "@vaildation":path.resolve(__dirname,'./src/vaildation'),
                        "@services":path.resolve(__dirname,'./src/services'),
               "@translate":path.resolve(__dirname,'./src/Translation')







}
  },
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  resolve:{
alias:{
  "@assets":path.resolve(import.meta.dirname,"./src/assets"),
    "@components":path.resolve(import.meta.dirname,"./src/components"),
      "@pages":path.resolve(import.meta.dirname,"./src/pages"),
  "@hooks":path.resolve(import.meta.dirname,"./src/hooks"),
    "@layouts":path.resolve(import.meta.dirname,"./src/layouts"),
      "@routes":path.resolve(import.meta.dirname,"./src/routes"),
  "@store":path.resolve(import.meta.dirname,"./src/store"),
    "@style":path.resolve(import.meta.dirname,"./src/style"),
      "@typeCustome":path.resolve(import.meta.dirname,"./src/typeCustome"),
            "@util":path.resolve(import.meta.dirname,"./src/util"),
            "@vaildation":path.resolve(import.meta.dirname,'./src/vaildation'),
                        "@services":path.resolve(import.meta.dirname,'./src/services'),
               "@translate":path.resolve(import.meta.dirname,'./src/Translation')







}
  },
  plugins: [react()],
})

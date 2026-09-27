import{ motion} from 'framer-motion'
const ButtonAnimation = ({children}:{children:React.ReactNode}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",             
        stiffness: 300,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  )
}

export default ButtonAnimation
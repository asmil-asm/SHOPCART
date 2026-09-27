
import { Button ,Stepper,Box,Step , StepLabel, Stack} from '@mui/material';
import { useState,useCallback } from 'react';
import SwitchStep from '@util/SwitchStep';
import { useTranslation} from 'react-i18next';
 import './Checkout.module.css'
const Checkout = () => {
  let [step,setStep]=useState<number>(0)
const {t,i18n}=useTranslation()
    const steps=[
   t( "Shipping Information"),
   t("Payment Method"),
    t("Review and confirm")
    
  ]
const handlenextStep=useCallback(()=>{

  setStep((prev)=>prev<steps.length-1? prev+1: prev)
},[steps.length])
const handlebackStep=useCallback(()=>{
  setStep((prev)=>prev>0? prev-1: prev)
},[steps.length])

  return (
    <Box>
      <Stepper activeStep={step} alternativeLabel  sx={{
        
    '& .MuiStepConnector-root': {
      left: i18n.language === 'ar'?'calc(50% + 10px)':'calc(-50% + 10px)',
      right: i18n.language === 'ar'? 'calc(-50% + 10px)':'calc(50% + 10px)',
    },
  }}>
{
  steps.map((lable)=>(
    <Step key={lable}>
    <StepLabel >{lable}</StepLabel>
    
    </Step>
  ))
}


  
      </Stepper>
       <Box sx={{ my: 4, minHeight: 200 }}>
        <SwitchStep step={step} onNext={handlenextStep} onBack={handlebackStep} />
      </Box>

      <Stack direction="row" sx={{justifyContent:'space-between', alignItems:'center'}}>
    <Button onClick={handlebackStep}disabled={step === 0}>Back</Button>
      <Button onClick={handlenextStep}disabled={step === steps.length - 1}>Next</Button>


</Stack>
    </Box>
  );
};

export default Checkout;
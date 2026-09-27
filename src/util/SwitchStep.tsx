import ShippingInformation from "@pages/Checkout/ShippingInformation";
import PaymentMethod from "@pages/Checkout/PaymentMethod";
import ReviewConfirm from "@pages/Checkout/ReviewConfirm";

interface Props {
  step: number;
  onNext: () => void;
  onBack: () => void;
}
const SwitchStep = ({ step, onNext, onBack }: Props) => {
  switch (step) {
    case 0:
      return <ShippingInformation onNext={onNext} />;
    case 1:
      return <PaymentMethod onNext={onNext} onBack={onBack} />;
    case 2:
      return <ReviewConfirm />;
    default:
      return null;
  }
};

export default SwitchStep;
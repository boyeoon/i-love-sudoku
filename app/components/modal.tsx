import Button from "@/components/buttons/button";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function Modal({ isVisible, onClose }: ModalProps) {
  if (!isVisible) return null;

  return (
    <div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 z-50 text-center rounded-md">
        <h2 className="text-xl font-bold text-[#255AB4] mb-4">Success!</h2>
        <Button onClick={onClose} buttonName="New game" />
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-40" />
      <Fireworks autorun={{ speed: 3 }} />
    </div>
  );
}

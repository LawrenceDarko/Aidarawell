interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="flex gap-4 md:gap-6">
      {/* Step Number Circle */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-lg">
          {number}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 pb-8 md:pb-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

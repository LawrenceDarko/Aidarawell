interface FounderStoryProps {
  name: string;
  title: string;
  yearsExperience: number;
  story: string;
  quote?: string;
  imageUrl?: string;
}

export function FounderStory({
  name,
  title,
  yearsExperience,
  story,
  quote,
  imageUrl,
}: FounderStoryProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Image */}
      {imageUrl && (
        <div className="hidden md:block">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div>
        <div className="mb-6">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-wide mb-2">
            Founder &amp; Clinical Leader
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {name}
          </h2>
          <p className="text-lg text-gray-600 mb-1">
            {title}
          </p>
          <p className="text-sm font-medium text-primary-600">
            {yearsExperience}+ years healthcare experience
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">
          {story}
        </p>

        {quote && (
          <blockquote className="bg-accent-50 border-l-4 border-accent-500 pl-4 py-4 rounded mb-6">
            <p className="text-gray-800 italic">
              "{quote}"
            </p>
          </blockquote>
        )}

        <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
          <p className="text-sm text-primary-900">
            <span className="font-semibold">Expertise:</span> Clinical oversight, caregiver training, rural healthcare advocacy
          </p>
        </div>
      </div>
    </div>
  );
}

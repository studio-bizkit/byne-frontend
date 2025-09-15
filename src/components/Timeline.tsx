export default function Timeline() {
  const timelineItems = [
    {
      title: "Established in 1931",
      description: "The estate carries a legacy stretching over a century. Known for its sustainable, wildlife-friendly farming practices, Bynekere produces the finest S795 Arabica coffee."
    },
    {
      title: "Fact no 02",
      description: "The estate carries a legacy stretching over a century. Known for its sustainable, wildlife-friendly farming practices, Bynekere produces the finest S795 Arabica coffee."
    },
    {
      title: "Fact no 03",
      description: "The estate carries a legacy stretching over a century. Known for its sustainable, wildlife-friendly farming practices, Bynekere produces the finest S795 Arabica coffee."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-3">
          {timelineItems.map((item, index) => (
            <div key={index} className="relative">
              {/* Number indicator */}
              <div className="absolute -top-4 left-0 w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="pt-8 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Connector line for desktop */}
              {index < timelineItems.length - 1 && (
                <div className="hidden md:block absolute top-4 right-0 w-full h-0.5 bg-gray-200 transform translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
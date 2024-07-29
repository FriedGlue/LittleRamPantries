interface InfoSectionProps {
  title: string;
  subtitle: string;
  texts: string[];
  titlePosition?: "left" | "right";
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  subtitle,
  texts,
  titlePosition = 'left',
}) => {
  const titleSection = (
    <div className="w-full md:w-2/5 p-4 justify-center items-center text-center">
      <h2 className="text-5xl">{title}</h2>
      <h4 className="text-2xl italic m-3">{subtitle}</h4>
    </div>
  );

  const textSections = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-3/5">
      {texts.map((text, index) => (
        <div key={index} className="bg-white p-4 rounded-2xl">
          <h2 className="text-2xl">{text}</h2>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex mt-32 gap-4 justify-around items-center p-4">
      {titlePosition === 'left' ? (
        <>
          {titleSection}
          {textSections}
        </>
      ) : (
        <>
          {textSections}
          {titleSection}
        </>
      )}
    </div>
  );
};

export default InfoSection;

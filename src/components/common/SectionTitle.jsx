const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {title.split(" ").map((word, i) =>
          word.toLowerCase() === "chatterly" || word === "Secure" || word === "Sacred" ? (
            <span key={i} className="text-primary">
              {word}{" "}
            </span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </h2>
      {subtitle && <p className="text-content text-lg mt-4 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
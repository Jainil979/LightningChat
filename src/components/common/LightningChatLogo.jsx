// src/components/common/LightningChatLogo.jsx

const LightningChatLogo = () => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {/* Icon – smaller on mobile */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-primary-dark rounded-xl flex items-center justify-center">
        <i className="fas fa-comments text-dark-bg text-base sm:text-lg"></i>
      </div>

      {/* Text block */}
      <div className="flex flex-col">
        <span className="text-xl sm:text-2xl font-bold text-white leading-none">
          Lightning
          <span className="text-[#35DFA8]">Chat</span>
        </span>
        <span className="text-[7px] sm:text-[7px] font-medium text-[#35DFA8] uppercase tracking-[2px] sm:tracking-[3px] mt-0.5 whitespace-nowrap">
          FAST • PRIVATE • ENCRYPTED
        </span>
      </div>
    </div>
  );
};

export default LightningChatLogo;
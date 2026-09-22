export function LinkForm() {
  return (
    <div className="bg-gray-100 rounded-lg p-6 sm:p-8 w-full sm:w-[380px] flex flex-col gap-6">
        <h2 className="text-large text-gray-600 text-center sm:text-left">
            Novo link
        </h2>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 group has-focus:text-blue-base">
                <label
                    htmlFor="link-original"
                    className="text-x-small uppercase text-gray-500 transition-colors group-has-focus:text-blue-base"
                >
                    Link original
                </label>
                
                <input 
                    type="text" 
                    id="link-original" 
                    name="link-original" 
                    placeholder="www.exemplo.com.br"
                    className="w-full h-12 rounded-md border border-gray-300 px-4 py-2 text-base text-gray-600 placeholder:text-gray-400 focus:border-blue-base focus:ring-1 focus:ring-blue-base focus:outline-hidden"
                />
            </div>

            <div className="flex flex-col gap-2 group has-focus:text-blue-base">
                <label
                    htmlFor="link-shortened"
                    className="text-x-small uppercase text-gray-500 transition-colors group-has-focus:text-blue-base"
                >
                    Link encurtado
                </label>
                
                <div className="flex items-center h-12 rounded-md border border-gray-300 px-4 shadow-xs focus-within:border-blue-base focus-within:ring-1 focus-within:ring-blue-base">
    
                    <span className="text-medium text-gray-400 select-none pr-0.5 font-medium whitespace-nowrap shrink-0">
                        brev-ly/
                    </span>
                    
                    <input 
                        type="text" 
                        id="slug" 
                        className="w-full h-full bg-transparent py-2 text-base text-gray-600 placeholder:text-gray-300 focus:outline-none"
                    />
                </div>
            </div>
        </div>
        <button className="bg-blue-base text-white rounded-lg px-3 py-2 w-full h-12 hover:bg-blue-dark disabled:opacity-50">
            Salvar link
        </button>
      </div>
  );
}
import { useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';

interface LogoUploaderProps {
  logo: string | null;
  onLogoChange: (logo: string | null) => void;
}

const LogoUploader = ({ logo, onLogoChange }: LogoUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onLogoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {logo ? (
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-border bg-secondary/50">
            <img
              src={logo}
              alt="Custom logo"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-20 h-20 rounded-xl border-2 border-dashed border-border bg-secondary/30 flex flex-col items-center justify-center gap-1 hover:bg-secondary/50 hover:border-primary/50 transition-all duration-200"
        >
          <Upload className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Logo</span>
        </button>
      )}
    </div>
  );
};

export default LogoUploader;

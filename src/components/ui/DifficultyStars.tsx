import React from 'react';
import { Star } from 'lucide-react';

interface DifficultyStarsProps {
    level: number;
    max?: number;
}

const DifficultyStars: React.FC<DifficultyStarsProps> = ({ level, max = 5 }) => {
    return (
        <div className="flex items-center gap-1.5">
            {[...Array(max)].map((_, i) => (
                <Star
                    key={i}
                    size={14}
                    className={`${
                        i < level 
                            ? 'text-emerald-400 fill-emerald-400' 
                            : 'text-zinc-800 fill-zinc-800'
                    } transition-colors`}
                    strokeWidth={1}
                />
            ))}
        </div>
    );
};

export default DifficultyStars;

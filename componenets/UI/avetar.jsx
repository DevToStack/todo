export default function UserAvatar({ name, size = 40 }) {
    const initial = name?.trim()?.charAt(0)?.toUpperCase() || '?';

    return (
        <div
            className="flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold select-none"
            style={{
                width: size,
                height: size,
                fontSize: size * 0.45
            }}
        >
            {initial}
        </div>
    );
}
  
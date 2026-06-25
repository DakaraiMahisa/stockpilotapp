interface UserInfoRowProps {
  label: string;
  value: React.ReactNode;
}

const UserInfoRow = ({ label, value }: UserInfoRowProps) => {
  return (
    <div className="flex justify-between py-3">
      <span
        style={{
          color: "var(--text-secondary)",
        }}
      >
        {label}
      </span>

      <span
        className="font-medium"
        style={{
          color: "var(--text-primary)",
        }}
      >
        {value}
      </span>
    </div>
  );
};

export default UserInfoRow;

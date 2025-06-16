import Countdown from 'react-countdown';

// Props: transaction_date dalam bentuk string ISO (misal dari database)
const TransactionCountdown = ({transactionDate}: {transactionDate: string}) => {
  // Ubah string ke objek Date
  const startDate = new Date(transactionDate);

  // Tambahkan 24 jam (dalam milidetik)
  const expiryDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

  return (
    <Countdown
      date={expiryDate}
      renderer={({hours, minutes, seconds, completed}) =>
        completed ? (
          <span className="text-red-500">Expired</span>
        ) : (
          <span>
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </span>
        )
      }
    />
  );
};

export default TransactionCountdown;

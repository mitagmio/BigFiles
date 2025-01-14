import ContractLink from "../shared/ui/ContractLink";
import {useRealtimeCollectionInfo} from "../features/drive/hook/useCollectionInfo";
import {fromNano} from "ton";
import {useMyCollection as useMyCollectionContract} from "../features/drive/hook/useMyCollection";

export interface AccountInfoProps {
  className?: string
}

export default function DriveInfoCard({className = ""}: AccountInfoProps) {
  const myDriveContract = useMyCollectionContract()
  const driveInfo = useRealtimeCollectionInfo()
  const isLoading = !driveInfo

  async function withdrawDriveBalance() {
    await myDriveContract?.closeCollection()
  }

  async function topUpDriveBalance() {
    await myDriveContract?.createCollection()
  }

  return (
    <div className={"card card-compact bg-base-200 shadow-md " + className}>
      <div className="card-body">
        <h2 className="card-title">My Drive</h2>
        <div className="overflow-x-auto">
          {
            driveInfo ?
            <table className="table table-sm">
              <tbody>
                <tr>
                  <th>Address</th>
                  <td><ContractLink address={driveInfo?.address?.toString()} /></td>
                </tr>
                <tr>
                  <th>Balance</th>
                  <td>{fromNano(driveInfo.balance)} TON</td>
                </tr>
              </tbody>
            </table> :
            <div className="flex justify-center">
              <span className="loading loading-bars loading-lg" />
            </div>
          }
        </div>
        <div className="card-actions justify-end">
          <button
            disabled={isLoading}
            className={"btn btn-outline btn-sm btn-error " + (isLoading ? 'btn-disabled' : '')}
            onClick={() => withdrawDriveBalance()}>
            {!isLoading ? <> Withdraw </> : <span className="loading loading-bars loading-sm" />}
          </button>
          <button
            disabled={isLoading}
              className={"btn btn-outline btn-sm btn-accent " + (isLoading ? 'btn-disabled' : '')}
              onClick={() => topUpDriveBalance()}>
            {!isLoading ? <> Top Up </> : <span className="loading loading-bars loading-sm" />}
          </button>
        </div>
      </div>
    </div>
  )
}

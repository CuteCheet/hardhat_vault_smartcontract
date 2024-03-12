import { network } from 'hardhat'

export const resetNode = async () => {
  await network.provider.send('hardhat_reset')
}

export const mine = async (blockNumber: number) => {
    await Promise.all(
      Array(blockNumber)
        .fill(0)
        .map((_) => {
          return network.provider.send('evm_mine')
        })
    )
  }
import { TonClient, Address } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import axios from 'axios';

interface NFT {
  id: string;
  owner: string;
  metadata: any;
}

async function getNFTsByContract(contractAddress: string): Promise<NFT[]> {
  try {
    // Initialize TON Client
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    // Create contract instance
    const address = Address.parse(contractAddress);
    const contract = client.open(address);

    // Get contract data
    const contractData = await contract.getGetMethods();

    // This part depends on your specific NFT contract implementation
    // You might need to call specific getter methods on your contract
    const nftCount = await contract.get("get_nft_count");
    const nfts: NFT[] = [];

    for (let i = 0; i < nftCount; i++) {
      const nftData = await contract.get("get_nft_data", [i]);
      const metadataUrl = nftData.metadata_url;
      
      // Fetch metadata if available
      let metadata = {};
      if (metadataUrl) {
        const metadataResponse = await axios.get(metadataUrl);
        metadata = metadataResponse.data;
      }

      nfts.push({
        id: nftData.id,
        owner: nftData.owner,
        metadata: metadata
      });
    }

    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return [];
  }
}
export {getNFTsByContract};
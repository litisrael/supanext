import { createClient } from "@/utils/supabase/client";

export async function processAndOrganizeData(data) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("id de parents", user.id);
  const tables = {
    parentsArray: [],
    ranksArray: [],
    salesRanksArray: [],
    variationsArray: [],
  };

  const { isoString, parents, childs } = data;

  for (const asin in parents) {
    const parent = parents[asin];
    const parent_id = `${isoString.split(".")[0]}@${asin}`;
    const user_id = user.id;
    // Add to parents array
    tables.parentsArray.push({ parent_id, asin, isoString, user_id });

    // Add to ranks array
    // if (parent.ranks) {
    //   parent.ranks.forEach((rank) => {
    //     tables.ranksArray.push({
    //       parent_id,
    //       marketplaceId: rank.marketplaceId,
    //       type: "rank",
    //       title: rank.title,
    //       link: rank.link,
    //       value: rank.value,
    //       rank: rank.rank,
    //     });
    //   });
    // }

    // Add to salesRanks array
    // if (parent.salesRanks) {
    //   parent.salesRanks.forEach((rank) => {
    //     console.log("cada salesRank osea rank",rank);
    //     tables.salesRanksArray.push({
    //       parent_id,
    //       marketplaceId: rank.marketplaceId,
     
    //       title: rank.rank.title,
    //       link:  rank.rank.link,
    //       value:  rank.rank.value,
    //       rank: rank.rank,
    //     });
    //   });
    // }

    if (parent.salesRanks) {
        parent.salesRanks.forEach(salesRank => {
            const categoryRank = salesRank.ranks[0] || {};
            const subCategoryRank = salesRank.ranks[1] || {};
            const user_id = user.id;
            tables.salesRanksArray.push({
                user_id,
                parent_id,
                marketplaceId: salesRank.marketplaceId,
                title_category: categoryRank.title || null,
                link_category: categoryRank.link || null,
                value_category: categoryRank.value || null,
                rank_category: categoryRank.rank || null,
                title_sub_category: subCategoryRank.title || null,
                link_sub_category: subCategoryRank.link || null,
                value_sub_category: subCategoryRank.value || null,
                rank_sub_category: subCategoryRank.rank || null
            });
        });
    }

    // Add to variations array

    if (parent.variations) {
      parent.variations.forEach((variation) => {

   
        tables.variationsArray.push({
          parent_id,
          asin: parent.asin,
          market_place_id: variation.marketplaceId,
          variation_data: variation.asins,
        });
      });
    }
  }
  console.log("tables.salesRanksArray",tables.salesRanksArray)

  //     for (const asin in childs) {
  //         const child = childs[asin];
  //         const parent_id = `${isoString.split('.')[0]}@${asin}`;

  //         // Add to parents array
  //         parentsArray.push({ parent_id, asin, isoString });

  //         // Add to ranks array
  //         if (child.ranks) {
  //             child.ranks.forEach(rank => {
  //                 ranksArray.push({ parent_id, marketplaceId: rank.marketplaceId, type: 'rank', title: rank.title, link: rank.link, value: rank.value, rank: rank.rank });
  //             });
  //         }

  //         // Add to salesRanks array
  //         if (child.salesRanks) {
  //             child.salesRanks.forEach(rank => {
  //                 salesRanksArray.push({ parent_id, marketplaceId: rank.marketplaceId, type: 'salesRank', title: rank.title, link: rank.link, value: rank.value, rank: rank.rank });
  //             });
  //         }

  //         // Add to variations array
  //         if (child.variations) {
  //             child.variations.forEach(variation => {
  //                 variationsArray.push({ parent_id, variation_data: variation });
  //             });
  //         }
  //     }

  return tables;
}

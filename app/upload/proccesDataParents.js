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
    
    childsArray: []

  };

  const { isoString, parents, childs } = data;
  
  const date = isoString.split("T")[0]
  
  
  for (const asin in parents) {
    const parent = parents[asin];
    const parent_id = `${isoString.split(".")[0]}@${asin}`;
    const user_id = user.id;
    let variations = null;
    if (parent.variations && parent.variations.length > 0) {
        // Aquí convertimos el array de ASINs a un array JSON
        
        variations = parent.variations[0].asins;
        //variations = parent.variations[0].asins.join(', ');
    }
    // Add to parents array
    // console.log(variations);
    tables.parentsArray.push({ parent_id, asin, isoString, user_id,variations });


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




  }



  for (const asin in childs) {
    const child = childs[asin];
    const { asin: asin_child, childParent: asin_parent } = child;
    const child_id = `${date}@${asin}`;
    // const child_id = `${isoString.split(".")[0]}@${asin}`;
    const user_id = user.id;
    tables.childsArray.push({user_id,child_id, asin_child, asin_parent ,date });
  }



  return tables;
}
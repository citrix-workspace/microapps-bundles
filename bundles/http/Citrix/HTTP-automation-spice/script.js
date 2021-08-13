async function approveDenyRequisition(sync) {
    console.log('Service action run');
}

function fullSync(sync) {
    console.log('Service action run');
    const sampleProduct =
        [
            {
                "product_id": 1,
                "name": "Allspice",
                "description": "Allspice, also called Jamaica pepper, pepper, myrtle pepper, pimenta, turkish Yenibahar,pimento, English pepper or newspice, is the dried unripe fruit (\"berries\", used as a spice) of Pimenta dioica, a midcanopy tree native to the Greater Antilles, southern Mexico, and Central America, now cultivated in many warm parts of the world. The name 'allspice' was coined as early as 1621 by the English, who thought it combined the flavour of cinnamon, nutmeg, and cloves.",
                "cost": 13,
                "self-closing": true
            },
            {
                "product_id": 2,
                "name": "Anise",
                "description": "Anise, Pimpinella anisum, also called aniseed, is a flowering plant in the family Apiaceae native to the eastern Mediterranean region and Southwest Asia. Its flavor has similarities with some other spices, such as star anise, fennel, and liquorice.",
                "cost": 22,
                "self-closing": true
            },
            {
                "product_id": 3,
                "name": "Basil",
                "description": "Basil, Thai basil, or sweet basil, is a common name for the culinary herb Ocimum basilicum of the family Lamiaceae (mints), sometimes known as Saint Joseph's Wort in some English-speaking countries.",
                "cost": 17,
                "self-closing": true
            },
            {
                "product_id": 4,
                "name": "Cardamom",
                "description": "Cardamom, sometimes called cardamon, is a spice made from the seeds of several plants in the genera Elettaria and Amomum in the family Zingiberaceae. Both genera are native to India, Pakistan, Nepal, and Bhutan; they are recognised by their small seed pods, triangular in cross-section and spindle-shaped, with a thin, papery outer shell and small black seeds. Guatemala, where the German coffee planter Oscar Majus Kloeffer introduced Indian cardamom before World War I, has become the biggest producer and exporter of cardamom in the world, followed by India. Some other countries, such as Sri Lanka, have also begun to cultivate it. Elettaria pods are light green, while Amomum pods are larger and dark brown.",
                "cost": 45,
                "self-closing": true
            },
            {
                "product_id": 5,
                "name": "Cinnamon",
                "description": "Cinnamon is a spice obtained from the inner bark of several trees from the genus Cinnamomum that is used in both sweet and savoury foods. While Cinnamomum verum is sometimes considered to be \"true cinnamon\", most cinnamon in international commerce is derived from related species, which are also referred to as \"cassia\" to distinguish them from \"true cinnamon\".",
                "cost": 16,
                "self-closing": true
            },
            {
                "product_id": 6,
                "name": "Oregano",
                "description": "Oregano is a common species of Origanum, a genus of the mint family (Lamiaceae). It is native to warm-temperate western and southwestern Eurasia and the Mediterranean region.",
                "cost": 25,
                "self-closing": true
            },
            {
                "product_id": 7,
                "name": "Paprika",
                "description": "Paprika is a spice made from air-dried fruits of the chili pepper family of the species Capsicum annuum. Although paprika is often associated with Hungarian cuisine, the chilies from which it is made are native to the New World. Spain and Portugal introduced C. annuum to the Old World from the Americas. Spanish pimenton, as it is known there, is often smoked, giving it a unique, earthy flavor. The seasoning is also used to add color and flavor to many types of dishes in the cuisines of Turkey, Spain, Portugal, Greece, Hungary, Romania, Croatia, Serbia, Macedonia, Bulgaria, Morocco, and South Africa.",
                "cost": 23,
                "self-closing": true
            },
            {
                "product_id": 8,
                "name": "Black pepper",
                "description": "Black pepper (Piper nigrum) is a flowering vine in the family Piperaceae, cultivated for its fruit, which is usually dried and used as a spice and seasoning. The fruit, known as a peppercorn when dried, is approximately 5 millimetres (0.20 in) in diameter, dark red when fully mature, and, like all drupes, contains a single seed. Peppercorns, and the ground pepper derived from them, may be described simply as pepper, or more precisely as black pepper (cooked and dried unripe fruit), green pepper (dried unripe fruit) and white pepper (ripe fruit seeds).",
                "cost": 38,
                "self-closing": true
            },
            {
                "product_id": 9,
                "name": "Rosemary",
                "description": "Rosmarinus officinalis, commonly known as rosemary, is a woody, perennial herb with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers, native to the Mediterranean region. It is a member of the mint family Lamiaceae, which includes many other herbs. The name \"rosemary\" derives from the Latin for \"dew\" (ros) and \"sea\" (marinus), or \"dew of the sea\". The plant is also sometimes called anthos, from the ancient Greek, meaning \"flower\". Rosemary has a fibrous root system.",
                "cost": 8,
                "self-closing": true
            },
            {
                "product_id": 10,
                "name": "Saffron",
                "description": "Saffron is a spice derived from the flower of Crocus sativus, commonly known as the saffron crocus. Crocus is a genus in the family Iridaceae. Saffron crocus grows to 20-30 cm (8-12 in) and bears up to four flowers, each with three vivid crimson stigmas, which are the distal end of a carpel. The styles and stigmas are collected and dried to be used mainly as a seasoning and colouring agent in food. Saffron, long among the world's most costly spices by weight, is native to Greece or Southwest Asia and was first cultivated in Greece. As a genetically monomorphic clone, it was slowly propagated throughout much of Eurasia and was later brought to parts of North Africa, North America, and Oceania.",
                "cost": 35,
                "self-closing": true
            },
            {
                "product_id": 11,
                "name": "Thyme",
                "description": "Thyme is an evergreen herb with culinary, medicinal and ornamental uses. Thyme is of the genus Thymus, most commonly Thymus vulgaris.",
                "cost": 19,
                "self-closing": true
            },
            {
                "product_id": 12,
                "name": "Wasabi",
                "description": "Wasabi, is a plant, member of the Brassicaceae family, which includes cabbages, horseradish, and mustard. It is also called Japanese horseradish, although horseradish is a different plant (which is often used as a substitute for wasabi). Its stem is used as a condiment and has an extremely strong pungency. Its hotness is more akin to that of a hot mustard than that of the capsaicin in a chili pepper, producing vapours that stimulate the nasal passages more than the tongue. The plant grows naturally along stream beds in mountain river valleys in Japan. The two main cultivars in the marketplace are E. japonicum 'Daruma' and 'Mazuma', but there are many others.",
                "cost": 21,
                "self-closing": true
            },
            {
                "product_id": 13,
                "name": "Caraway",
                "description": "Caraway, also known as Persian cumin, (Carum carvi) is a biennial plant in the family Apiaceae, native to western Asia, Europe, and North Africa.&#xD; &#xD; The plant is similar in appearance to other members of the carrot family, with finely divided, feathery leaves with thread-like divisions, growing on 20-30 cm (7.9-11.8 in) stems. The main flower stem is 40-60 cm (16â-24 in) tall, with small white or pink flowers in umbels. Caraway fruits (erroneously called seeds) are crescent-shaped achenes, around 2 mm long, with five pale ridges.",
                "cost": 8,
                "self-closing": true
            },
            {
                "product_id": 14,
                "name": "Tarragon",
                "description": "Tarragon (Artemisia dracunculus), also known as estragon, is a species of perennial herb in the sunflower family. It is widespread in the wild across much of Eurasia and North America, and is cultivated for culinary and medicinal purposes.&#xA;&#xA;One sub-species, Artemisia dracunculus var. sativa, is cultivated for use of the leaves as an aromatic culinary herb. In some other sub-species, the characteristic aroma is largely absent. The species is polymorphic. Informal names for distinguishing the variations include \"French tarragon\" (best for culinary use[citation needed]), \"Russian tarragon\" (typically better than wild tarragon but not as good as so-called French tarragon for culinary use), and \"wild tarragon\" (covers various states).&#xA;&#xA;Tarragon grows to 120-150 cm (47-59 in) tall, with slender branched stems. The leaves are lanceolate, 2â8 cm (0.79-3.15 in) long and 2-10 mm broad, glossy green, with an entire margin. The flowers are produced in small capitulae 2-4 mm diameter.",
                "cost": 98,
                "self-closing": true
            },
            {
                "product_id": 15,
                "name": "Mustard seed",
                "description": "Mustard seeds are the small round seeds of various mustard plants. The seeds are usually about 1-2 millimetres (0.039-0.079 in) in diameter and may be colored from yellowish white to black. They are important spice in many regional foods and may come from one of three different plants: black mustard (Brassica nigra), brown Indian mustard (B. juncea), or white mustard (B. hirta/Sinapis alba).&#xA;&#xA;Grinding and mixing the seeds with water, vinegar, or other liquids, creates the yellow condiment known as prepared mustard.",
                "cost": 7,
                "self-closing": true
            },
            {
                "product_id": 16,
                "name": "Marjoram",
                "description": "Marjoram (Origanum majorana, syn. Majorana hortensis Moench, Majorana majorana (L.) H. Karst) is a somewhat cold-sensitive perennial herb or undershrub with sweet pine and citrus flavors. In some Middle Eastern countries, marjoram is synonymous with oregano, and there the names sweet marjoram and knotted marjoram are used to distinguish it from other plants of the genus Origanum. It is also called pot marjoram, although this name is also used for other cultivated species of Origanum.",
                "cost": 25,
                "self-closing": true
            },
            {
                "product_id": 17,
                "name": "Bay leaf",
                "description": "Bay leaf (plural bay leaves) refers to the aromatic leaves of several plants used in cooking. If eaten whole, bay leaves (Laurus nobilis) are pungent and have a sharp, bitter taste. As with many spices and flavorings, the fragrance of the bay leaf is more noticeable than its taste. When dried, the fragrance is herbal, slightly floral, and somewhat similar to oregano and thyme. Myrcene, which is a component of many essential oils used in perfumery, can be extracted from the bay leaf. They also contain the essential oil eugenol.",
                "cost": 11,
                "self-closing": true
            },
            {
                "product_id": 18,
                "name": "Coriander",
                "description": "Coriander (Coriandrum sativum), also known as cilantro or Chinese parsley, is an annual herb in the family Apiaceae. All parts of the plant are edible, but the fresh leaves and the dried seeds are the parts most traditionally used in cooking.",
                "cost": 17,
                "self-closing": true
            },
            {
                "product_id": 19,
                "name": "Ginger",
                "description": "Ginger (Zingiber officinale) is a flowering plant whose rhizome, ginger root or simply ginger, is widely used as a spice or a folk medicine. It is a herbaceous perennial which grows annual stems about a meter tall bearing narrow green leaves and yellow flowers. Ginger is in the family Zingiberaceae, to which also belong turmeric (Curcuma longa), cardamom (Elettaria cardamomum), and galangal. Ginger originated in the tropical rainforest in Southern Asia. Although ginger no longer grows wild, it is thought to have originated on the Indian subcontinent. The ginger plants grown in India show the largest amount of genetic variation. The larger the number of genetic variations, the longer the plant is thought to have grown in that region. Ginger was exported to Europe via India in the first century AD as a result of the lucrative spice trade and was used extensively by the Romans. The distantly related dicots in the genus Asarum are commonly called wild ginger because of their similar taste.",
                "cost": 27,
                "self-closing": true
            },
            {
                "product_id": 20,
                "name": "Nutmeg",
                "description": "Nutmeg (also known as pala in Indonesia) is one of the two spices - the other being mace - derived from several species of tree in the genus Myristica. The most important commercial species is Myristica fragrans, an evergreen tree indigenous to the Banda Islands in the Moluccas (or Spice Islands) of Indonesia.&#xA;&#xA;Nutmeg is the seed of the tree, roughly egg-shaped and about 20-30 mm (0.8-1.2 in) long and 15-18 mm (0.6-0.7 in) wide, and weighing 5-10 g (0.2-0.4 oz) dried, while mace is the dried \"lacy\" reddish covering or aril of the seed. The first harvest of nutmeg trees takes place 7-9 years after planting, and the trees reach full production after twenty years. Nutmeg is usually used in powdered form. This is the only tropical fruit that is the source of two different spices, obtained from different parts of the plant. Several other commercial products are also produced from the trees, including essential oils, extracted oleoresins, and nutmeg butter.",
                "cost": 22,
                "self-closing": true
            },
            {
                "product_id": 21,
                "name": "Chives",
                "description": "Chives is the common name of Allium schoenoprasum, an edible species of the Allium genus.&#xA;A perennial plant, it is widespread in nature across much of Europe, Asia, and North America.&#xA;A. schoenoprasum is the only species of Allium native to both the New and the Old Worlds.&#xA;Its English name, chives, derives from the French word cive, from cepa, the Latin word for onion.&#xA;Chives are a commonly used herb and can be found in grocery stores or grown in home gardens. In culinary use, the scapes and the unopened, immature flower buds are diced and used as an ingredient for fish, potatoes, soups, and other dishes. Chives have insect-repelling properties that can be used in gardens to control pests.",
                "cost": 50,
                "self-closing": true
            },
            {
                "product_id": 22,
                "name": "Dill",
                "description": "Dill (Anethum graveolens) is an annual herb in the celery family Apiaceae.&#xA;&#xA;It is the sole species of the genus Anethum.",
                "cost": 16,
                "self-closing": true
            },
            {
                "product_id": 23,
                "name": "Fennel",
                "description": "Fennel (Foeniculum vulgare) is a flowering plant species in the carrot family. It is a hardy, perennial herb with yellow flowers and feathery leaves. It is indigenous to the shores of the Mediterranean but has become widely naturalized in many parts of the world, especially on dry soils near the sea-coast and on riverbanks.&#xA;&#xA;It is a highly aromatic and flavorful herb with culinary and medicinal uses and, along with the similar-tasting anise, is one of the primary ingredients of absinthe. Florence fennel or finocchio is a selection with a swollen, bulb-like stem base that is used as a vegetable.&#xA;&#xA;Fennel is used as a food plant by the larvae of some Lepidoptera species including the mouse moth and the anise swallowtail.",
                "cost": 18,
                "self-closing": true
            },
            {
                "product_id": 24,
                "name": "Ginseng",
                "description": "Ginseng is any one of the 11 species of slow-growing perennial plants with fleshy roots, belonging to the genus Panax of the family Araliaceae.&#xA;&#xA;Ginseng is found in North America and in eastern Asia (mostly northeast China, Korea, Bhutan, eastern Siberia), typically in cooler climates. Panax vietnamensis, discovered in Vietnam, is the southernmost ginseng known. This article focuses on the species of the series Panax, which are the species claimed to be adaptogens, principally Panax ginseng and P. quinquefolius. Ginseng is characterized by the presence of ginsenosides and gintonin.&#xA;&#xA;Siberian ginseng (Eleutherococcus senticosus) is in the same family, but not genus, as true ginseng. Like ginseng, it is considered to be an adaptogenic herb. The active compounds in Siberian ginseng are eleutherosides, not ginsenosides. Instead of a fleshy root, Siberian ginseng has a woody root.&#xA;&#xA;Over centuries, ginseng has been considered in China as an important component of Chinese traditional medicine.",
                "cost": 17,
                "self-closing": true
            },
            {
                "product_id": 25,
                "name": "Parsley",
                "description": "Parsley or garden parsley (Petroselinum crispum) is a species of Petroselinum in the family Apiaceae, native to the central Mediterranean region (southern Italy, Greece, Algeria, and Tunisia), naturalized elsewhere in Europe, and widely cultivated as a herb, a spice, and a vegetable.&#xA;&#xA;Where it grows as a biennial, in the first year, it forms a rosette of tripinnate leaves 10-25 cm (3.9-9.8 in) long with numerous 1-3 cm (0.4-1.2 in) leaflets, and a taproot used as a food store over the winter.&#xA;&#xA;Parsley is widely used in European, Middle Eastern, and American cooking. Curly leaf parsley is often used as a garnish. In central Europe, eastern Europe and southern Europe, as well as and in western Asia, many dishes are served with fresh green chopped parsley sprinkled on top. Root parsley is very common in central, eastern and southern European cuisines, where it is used as a snack or a vegetable in many soups, stews, and casseroles.",
                "cost": 20,
                "self-closing": true
            },
            {
                "product_id": 26,
                "name": "Liquirice",
                "description": "Liquorice, or licorice, rish is the root of Glycyrrhiza glabra from which a sweet flavour can be extracted. The liquorice plant is a herbaceous perennial legume native to southern Europe and parts of Asia, such as India. It is not botanically related to anise, star anise, or fennel, which are sources of similar flavouring compounds.&#xA;&#xA;Most liquorice is used as a flavouring agent for tobacco, particularly US blend cigarettes, to which liquorice lends a natural sweetness and a distinctive flavour and makes it easier to inhale the smoke by creating bronchodilators, which open up the lungs.Liquorice flavours are also used as candies or sweeteners, particularly in some European and Middle Eastern countries. Liquorice extracts have a number of medical uses, and they are also used in herbal and folk medications. Excessive consumption of liquorice (more than 2 mg/kg/day of pure glycyrrhizinic acid, a liquorice component) may result in adverse effects",
                "cost": 26,
                "self-closing": true
            },
            {
                "product_id": 27,
                "name": "Lovage",
                "description": "Lovage, Levisticum officinale, is a tall perennial plant, the sole species in the genus Levisticum in the family Apiaceae, subfamily Apioideae, tribe Apieae. Lovage is an erect, herbaceous, perennial plant growing to 1.8-2.5 m (5.9-8.2 ft) tall, with a basal rosette of leaves and stems with further leaves, the flowers being produced in umbels at the top of the stems. The stems and leaves are shiny glabrous green to yellow-green and smell somewhat similar to celery when crushed. The larger basal leaves are up to 70 cm (28 in) long, tripinnate, with broad triangular to rhomboidal, acutely pointed leaflets with a few marginal teeth; the stem leaves are smaller, and less divided with few leaflets. The flowers are yellow to greenish-yellow, 2-3 mm (0.079-0.118 in) diameter, produced in globose umbels up to 10-15 cm (3.95.9 in) diameter; flowering is in late spring. The fruit is a dry two-parted schizocarp 4-7 mm (0.16-0.28 in) long, mature in autumn.",
                "cost": 71,
                "self-closing": true
            },
            {
                "product_id": 28,
                "name": "Rose hip",
                "description": "The rose hip, also known as rose haw or rose hep, is the fruit of the rose plant, that typically is red-to-orange, but ranges from dark purple to black in some species. Rose hips begin to form after successful pollination of flowers in spring or early summer, and ripen in late summer through autumn.",
                "cost": 24,
                "self-closing": true
            },
            {
                "product_id": 29,
                "name": "Clove",
                "description": "Cloves are the aromatic flower buds of a tree in the family Myrtaceae, Syzygium aromaticum. They are native to the Maluku Islands in Indonesia, and are commonly used as a spice. Cloves are commercially harvested primarily in Bangladesh, Indonesia, India, Madagascar, Zanzibar, Pakistan, Sri Lanka, and Tanzania. Cloves are available throughout the year.",
                "cost": 37,
                "self-closing": true
            },
            {
                "product_id": 30,
                "name": "Vanilla",
                "description": "Vanilla is a flavoring derived from orchids of the genus Vanilla, primarily from the Mexican species, flat-leaved vanilla (V. planifolia). The word vanilla, derived from the diminutive of the Spanish word vaina (vaina itself meaning sheath or pod), is translated simply as \"little pod\". Pre-Columbian Mesoamerican people cultivated the vine of the vanilla orchid, called tlilxochitl by the Aztecs. Spanish conquistador Cortes is credited with introducing both vanilla and chocolate to Europe in the 1520s.&#xA;&#xA;Initial attempts to cultivate vanilla outside Mexico and Central America proved futile because of the symbiotic relationship between the vanilla orchid and its natural pollinator, the local species of Melipona bee. Pollination is required to set the fruit from which the flavoring is derived. In 1837, Belgian botanist Charles Francois Antoine Morren discovered this fact and pioneered a method of artificially pollinating the plant. The method proved financially unworkable and was not deployed",
                "cost": 299,
                "self-closing": true
            }

        ]
    const sampleWarehouse =
        [
            {
                "warehouse_id": 1,
                "title": "Sapho San Francisco",
                "location": "1150 Bayhill Drive, Suite 325, San Bruno, CA 94066",
                "note": "Sapho Headquarters",
                "self-closing": true
            },
            {
                "warehouse_id": 2,
                "title": "Sapho Prague",
                "location": "Na Prikope 1, Praha 1, 110 00, Czech Republic",
                "note": "Sapho Development",
                "self-closing": true
            },
            {
                "warehouse_id": 3,
                "title": "Sapho New York",
                "location": "2788 Broadway, New York, NY 10025",
                "note": "Sapho Breakfast Bagels",
                "self-closing": true
            },
            {
                "warehouse_id": 4,
                "title": "Sapho Japan",
                "location": "1-6-7 Nihonbashi-Horidomecho, Chuo-ku, Tokyo",
                "note": "Sapho Wagyu Beef Destination",
                "self-closing": true
            },
            {
                "warehouse_id": 5,
                "title": "Sapho Monaco",
                "location": "Place du Casino, 98000 Monaco",
                "note": "Sapho Card Game Destination",
                "self-closing": true
            },
            {
                "warehouse_id": 6,
                "title": "Sapho Arjeplog",
                "location": "Maskinvagen 3, 930 90 Arjeplog",
                "note": "Sapho Winter Sports Facility",
                "self-closing": true
            }
        ]

    const sampleInvoiceLineItem = [
        {
            "item_id": 1,
            "invoice_id": 71,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 13,
            "cost": 524,
            "discount": 446,
            "self-closing": true
        },
        {
            "item_id": 2,
            "invoice_id": 91,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 98,
            "cost": 1138,
            "discount": 749,
            "self-closing": true
        },
        {
            "item_id": 3,
            "invoice_id": 395,
            "invoice_item_number": 8,
            "product_id": 30,
            "quantity": 90,
            "cost": 305,
            "discount": 856,
            "self-closing": true
        },
        {
            "item_id": 4,
            "invoice_id": 330,
            "invoice_item_number": 1,
            "product_id": 17,
            "quantity": 29,
            "cost": 1013,
            "discount": 482,
            "self-closing": true
        },
        {
            "item_id": 5,
            "invoice_id": 43,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 13,
            "cost": 500,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 6,
            "invoice_id": 128,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 91,
            "cost": 501,
            "discount": 730,
            "self-closing": true
        },
        {
            "item_id": 7,
            "invoice_id": 277,
            "invoice_item_number": 5,
            "product_id": 10,
            "quantity": 94,
            "cost": 1170,
            "discount": 706,
            "self-closing": true
        },
        {
            "item_id": 8,
            "invoice_id": 262,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 30,
            "cost": 503,
            "discount": 473,
            "self-closing": true
        },
        {
            "item_id": 9,
            "invoice_id": 221,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 26,
            "cost": 602,
            "discount": 402,
            "self-closing": true
        },
        {
            "item_id": 10,
            "invoice_id": 39,
            "invoice_item_number": 1,
            "product_id": 3,
            "quantity": 18,
            "cost": 118,
            "discount": 100,
            "self-closing": true
        },
        {
            "item_id": 11,
            "invoice_id": 39,
            "invoice_item_number": 2,
            "product_id": 18,
            "quantity": 2,
            "cost": 45,
            "discount": 55,
            "self-closing": true
        },
        {
            "item_id": 12,
            "invoice_id": 189,
            "invoice_item_number": 6,
            "product_id": 18,
            "quantity": 50,
            "cost": 909,
            "discount": 634,
            "self-closing": true
        },
        {
            "item_id": 13,
            "invoice_id": 71,
            "invoice_item_number": 9,
            "product_id": 20,
            "quantity": 43,
            "cost": 1026,
            "discount": 430,
            "self-closing": true
        },
        {
            "item_id": 14,
            "invoice_id": 395,
            "invoice_item_number": 3,
            "product_id": 15,
            "quantity": 62,
            "cost": 703,
            "discount": 517,
            "self-closing": true
        },
        {
            "item_id": 15,
            "invoice_id": 332,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 60,
            "cost": 1112,
            "discount": 652,
            "self-closing": true
        },
        {
            "item_id": 16,
            "invoice_id": 206,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 64,
            "cost": 991,
            "discount": 589,
            "self-closing": true
        },
        {
            "item_id": 17,
            "invoice_id": 39,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 64,
            "cost": 1192,
            "discount": 807,
            "self-closing": true
        },
        {
            "item_id": 18,
            "invoice_id": 89,
            "invoice_item_number": 1,
            "product_id": 22,
            "quantity": 91,
            "cost": 845,
            "discount": 924,
            "self-closing": true
        },
        {
            "item_id": 19,
            "invoice_id": 39,
            "invoice_item_number": 3,
            "product_id": 28,
            "quantity": 30,
            "cost": 529,
            "discount": 11,
            "self-closing": true
        },
        {
            "item_id": 20,
            "invoice_id": 68,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 72,
            "cost": 1038,
            "discount": 105,
            "self-closing": true
        },
        {
            "item_id": 21,
            "invoice_id": 395,
            "invoice_item_number": 5,
            "product_id": 21,
            "quantity": 97,
            "cost": 140,
            "discount": 977,
            "self-closing": true
        },
        {
            "item_id": 22,
            "invoice_id": 32,
            "invoice_item_number": 1,
            "product_id": 18,
            "quantity": 84,
            "cost": 1395,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 23,
            "invoice_id": 327,
            "invoice_item_number": 1,
            "product_id": 3,
            "quantity": 77,
            "cost": 227,
            "discount": 425,
            "self-closing": true
        },
        {
            "item_id": 24,
            "invoice_id": 29,
            "invoice_item_number": 8,
            "product_id": 26,
            "quantity": 20,
            "cost": 1298,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 25,
            "invoice_id": 39,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 12,
            "cost": 145,
            "discount": 4,
            "self-closing": true
        },
        {
            "item_id": 26,
            "invoice_id": 360,
            "invoice_item_number": 4,
            "product_id": 2,
            "quantity": 27,
            "cost": 1490,
            "discount": 502,
            "self-closing": true
        },
        {
            "item_id": 27,
            "invoice_id": 153,
            "invoice_item_number": 1,
            "product_id": 22,
            "quantity": 48,
            "cost": 765,
            "discount": 662,
            "self-closing": true
        },
        {
            "item_id": 28,
            "invoice_id": 343,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 91,
            "cost": 153,
            "discount": 746,
            "self-closing": true
        },
        {
            "item_id": 29,
            "invoice_id": 397,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 48,
            "cost": 1138,
            "discount": 806,
            "self-closing": true
        },
        {
            "item_id": 30,
            "invoice_id": 87,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 90,
            "cost": 244,
            "discount": 616,
            "self-closing": true
        },
        {
            "item_id": 31,
            "invoice_id": 38,
            "invoice_item_number": 5,
            "product_id": 25,
            "quantity": 89,
            "cost": 901,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 32,
            "invoice_id": 14,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 55,
            "cost": 1256,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 33,
            "invoice_id": 11,
            "invoice_item_number": 5,
            "product_id": 10,
            "quantity": 71,
            "cost": 1013,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 34,
            "invoice_id": 91,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 85,
            "cost": 723,
            "discount": 42,
            "self-closing": true
        },
        {
            "item_id": 35,
            "invoice_id": 89,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 82,
            "cost": 1115,
            "discount": 515,
            "self-closing": true
        },
        {
            "item_id": 36,
            "invoice_id": 187,
            "invoice_item_number": 5,
            "product_id": 10,
            "quantity": 63,
            "cost": 652,
            "discount": 265,
            "self-closing": true
        },
        {
            "item_id": 37,
            "invoice_id": 293,
            "invoice_item_number": 3,
            "product_id": 14,
            "quantity": 62,
            "cost": 996,
            "discount": 182,
            "self-closing": true
        },
        {
            "item_id": 38,
            "invoice_id": 357,
            "invoice_item_number": 8,
            "product_id": 20,
            "quantity": 77,
            "cost": 1413,
            "discount": 720,
            "self-closing": true
        },
        {
            "item_id": 39,
            "invoice_id": 98,
            "invoice_item_number": 3,
            "product_id": 15,
            "quantity": 42,
            "cost": 333,
            "discount": 110,
            "self-closing": true
        },
        {
            "item_id": 40,
            "invoice_id": 369,
            "invoice_item_number": 7,
            "product_id": 22,
            "quantity": 30,
            "cost": 227,
            "discount": 898,
            "self-closing": true
        },
        {
            "item_id": 41,
            "invoice_id": 29,
            "invoice_item_number": 2,
            "product_id": 17,
            "quantity": 92,
            "cost": 455,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 42,
            "invoice_id": 136,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 21,
            "cost": 1461,
            "discount": 572,
            "self-closing": true
        },
        {
            "item_id": 43,
            "invoice_id": 218,
            "invoice_item_number": 5,
            "product_id": 4,
            "quantity": 90,
            "cost": 1164,
            "discount": 620,
            "self-closing": true
        },
        {
            "item_id": 44,
            "invoice_id": 118,
            "invoice_item_number": 1,
            "product_id": 8,
            "quantity": 67,
            "cost": 1090,
            "discount": 799,
            "self-closing": true
        },
        {
            "item_id": 45,
            "invoice_id": 260,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 41,
            "cost": 505,
            "discount": 130,
            "self-closing": true
        },
        {
            "item_id": 46,
            "invoice_id": 311,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 91,
            "cost": 1088,
            "discount": 13,
            "self-closing": true
        },
        {
            "item_id": 47,
            "invoice_id": 309,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 66,
            "cost": 1370,
            "discount": 311,
            "self-closing": true
        },
        {
            "item_id": 48,
            "invoice_id": 9,
            "invoice_item_number": 1,
            "product_id": 19,
            "quantity": 72,
            "cost": 539,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 49,
            "invoice_id": 167,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 43,
            "cost": 1335,
            "discount": 81,
            "self-closing": true
        },
        {
            "item_id": 50,
            "invoice_id": 244,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 100,
            "cost": 994,
            "discount": 274,
            "self-closing": true
        },
        {
            "item_id": 51,
            "invoice_id": 305,
            "invoice_item_number": 6,
            "product_id": 13,
            "quantity": 87,
            "cost": 104,
            "discount": 147,
            "self-closing": true
        },
        {
            "item_id": 52,
            "invoice_id": 152,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 67,
            "cost": 785,
            "discount": 938,
            "self-closing": true
        },
        {
            "item_id": 53,
            "invoice_id": 99,
            "invoice_item_number": 9,
            "product_id": 3,
            "quantity": 15,
            "cost": 1409,
            "discount": 487,
            "self-closing": true
        },
        {
            "item_id": 54,
            "invoice_id": 343,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 82,
            "cost": 548,
            "discount": 58,
            "self-closing": true
        },
        {
            "item_id": 55,
            "invoice_id": 379,
            "invoice_item_number": 9,
            "product_id": 3,
            "quantity": 93,
            "cost": 213,
            "discount": 937,
            "self-closing": true
        },
        {
            "item_id": 56,
            "invoice_id": 52,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 50,
            "cost": 1333,
            "discount": 307,
            "self-closing": true
        },
        {
            "item_id": 57,
            "invoice_id": 44,
            "invoice_item_number": 1,
            "product_id": 4,
            "quantity": 44,
            "cost": 444,
            "discount": 44,
            "self-closing": true
        },
        {
            "item_id": 58,
            "invoice_id": 308,
            "invoice_item_number": 1,
            "product_id": 11,
            "quantity": 35,
            "cost": 69,
            "discount": 925,
            "self-closing": true
        },
        {
            "item_id": 59,
            "invoice_id": 230,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 43,
            "cost": 945,
            "discount": 953,
            "self-closing": true
        },
        {
            "item_id": 60,
            "invoice_id": 88,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 97,
            "cost": 760,
            "discount": 355,
            "self-closing": true
        },
        {
            "item_id": 61,
            "invoice_id": 25,
            "invoice_item_number": 1,
            "product_id": 21,
            "quantity": 83,
            "cost": 751,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 62,
            "invoice_id": 58,
            "invoice_item_number": 1,
            "product_id": 7,
            "quantity": 87,
            "cost": 1482,
            "discount": 737,
            "self-closing": true
        },
        {
            "item_id": 63,
            "invoice_id": 214,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 26,
            "cost": 137,
            "discount": 745,
            "self-closing": true
        },
        {
            "item_id": 64,
            "invoice_id": 201,
            "invoice_item_number": 1,
            "product_id": 5,
            "quantity": 100,
            "cost": 569,
            "discount": 354,
            "self-closing": true
        },
        {
            "item_id": 65,
            "invoice_id": 92,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 60,
            "cost": 405,
            "discount": 191,
            "self-closing": true
        },
        {
            "item_id": 66,
            "invoice_id": 229,
            "invoice_item_number": 1,
            "product_id": 28,
            "quantity": 52,
            "cost": 769,
            "discount": 890,
            "self-closing": true
        },
        {
            "item_id": 67,
            "invoice_id": 294,
            "invoice_item_number": 1,
            "product_id": 22,
            "quantity": 36,
            "cost": 1329,
            "discount": 988,
            "self-closing": true
        },
        {
            "item_id": 68,
            "invoice_id": 144,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 89,
            "cost": 891,
            "discount": 321,
            "self-closing": true
        },
        {
            "item_id": 69,
            "invoice_id": 90,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 99,
            "cost": 658,
            "discount": 914,
            "self-closing": true
        },
        {
            "item_id": 70,
            "invoice_id": 63,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 57,
            "cost": 614,
            "discount": 95,
            "self-closing": true
        },
        {
            "item_id": 71,
            "invoice_id": 233,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 73,
            "cost": 146,
            "discount": 710,
            "self-closing": true
        },
        {
            "item_id": 72,
            "invoice_id": 289,
            "invoice_item_number": 1,
            "product_id": 21,
            "quantity": 61,
            "cost": 1177,
            "discount": 280,
            "self-closing": true
        },
        {
            "item_id": 73,
            "invoice_id": 74,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 98,
            "cost": 1421,
            "discount": 334,
            "self-closing": true
        },
        {
            "item_id": 74,
            "invoice_id": 264,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 11,
            "cost": 918,
            "discount": 582,
            "self-closing": true
        },
        {
            "item_id": 75,
            "invoice_id": 337,
            "invoice_item_number": 3,
            "product_id": 7,
            "quantity": 69,
            "cost": 626,
            "discount": 175,
            "self-closing": true
        },
        {
            "item_id": 76,
            "invoice_id": 133,
            "invoice_item_number": 6,
            "product_id": 12,
            "quantity": 63,
            "cost": 1190,
            "discount": 874,
            "self-closing": true
        },
        {
            "item_id": 77,
            "invoice_id": 94,
            "invoice_item_number": 2,
            "product_id": 18,
            "quantity": 95,
            "cost": 150,
            "discount": 988,
            "self-closing": true
        },
        {
            "item_id": 78,
            "invoice_id": 71,
            "invoice_item_number": 6,
            "product_id": 14,
            "quantity": 43,
            "cost": 1237,
            "discount": 300,
            "self-closing": true
        },
        {
            "item_id": 79,
            "invoice_id": 139,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 67,
            "cost": 138,
            "discount": 479,
            "self-closing": true
        },
        {
            "item_id": 80,
            "invoice_id": 40,
            "invoice_item_number": 5,
            "product_id": 11,
            "quantity": 45,
            "cost": 3765,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 81,
            "invoice_id": 17,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 64,
            "cost": 1448,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 82,
            "invoice_id": 300,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 84,
            "cost": 632,
            "discount": 614,
            "self-closing": true
        },
        {
            "item_id": 83,
            "invoice_id": 185,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 40,
            "cost": 797,
            "discount": 811,
            "self-closing": true
        },
        {
            "item_id": 84,
            "invoice_id": 355,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 23,
            "cost": 1256,
            "discount": 265,
            "self-closing": true
        },
        {
            "item_id": 85,
            "invoice_id": 360,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 100,
            "cost": 928,
            "discount": 894,
            "self-closing": true
        },
        {
            "item_id": 86,
            "invoice_id": 337,
            "invoice_item_number": 9,
            "product_id": 1,
            "quantity": 55,
            "cost": 1198,
            "discount": 636,
            "self-closing": true
        },
        {
            "item_id": 87,
            "invoice_id": 376,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 38,
            "cost": 635,
            "discount": 163,
            "self-closing": true
        },
        {
            "item_id": 88,
            "invoice_id": 53,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 86,
            "cost": 1050,
            "discount": 581,
            "self-closing": true
        },
        {
            "item_id": 89,
            "invoice_id": 207,
            "invoice_item_number": 6,
            "product_id": 30,
            "quantity": 58,
            "cost": 908,
            "discount": 329,
            "self-closing": true
        },
        {
            "item_id": 90,
            "invoice_id": 63,
            "invoice_item_number": 8,
            "product_id": 20,
            "quantity": 23,
            "cost": 783,
            "discount": 132,
            "self-closing": true
        },
        {
            "item_id": 91,
            "invoice_id": 282,
            "invoice_item_number": 7,
            "product_id": 4,
            "quantity": 77,
            "cost": 412,
            "discount": 553,
            "self-closing": true
        },
        {
            "item_id": 92,
            "invoice_id": 180,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 84,
            "cost": 218,
            "discount": 979,
            "self-closing": true
        },
        {
            "item_id": 93,
            "invoice_id": 66,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 30,
            "cost": 285,
            "discount": 612,
            "self-closing": true
        },
        {
            "item_id": 94,
            "invoice_id": 9,
            "invoice_item_number": 4,
            "product_id": 17,
            "quantity": 56,
            "cost": 221,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 95,
            "invoice_id": 15,
            "invoice_item_number": 1,
            "product_id": 24,
            "quantity": 11,
            "cost": 227,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 96,
            "invoice_id": 395,
            "invoice_item_number": 5,
            "product_id": 11,
            "quantity": 25,
            "cost": 1255,
            "discount": 915,
            "self-closing": true
        },
        {
            "item_id": 97,
            "invoice_id": 199,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 96,
            "cost": 966,
            "discount": 751,
            "self-closing": true
        },
        {
            "item_id": 98,
            "invoice_id": 58,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 16,
            "cost": 433,
            "discount": 806,
            "self-closing": true
        },
        {
            "item_id": 99,
            "invoice_id": 40,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 99,
            "cost": 3249,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 100,
            "invoice_id": 26,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 80,
            "cost": 1032,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 101,
            "invoice_id": 135,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 58,
            "cost": 1114,
            "discount": 950,
            "self-closing": true
        },
        {
            "item_id": 102,
            "invoice_id": 243,
            "invoice_item_number": 1,
            "product_id": 20,
            "quantity": 92,
            "cost": 626,
            "discount": 910,
            "self-closing": true
        },
        {
            "item_id": 103,
            "invoice_id": 70,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 60,
            "cost": 346,
            "discount": 796,
            "self-closing": true
        },
        {
            "item_id": 104,
            "invoice_id": 161,
            "invoice_item_number": 1,
            "product_id": 25,
            "quantity": 88,
            "cost": 527,
            "discount": 955,
            "self-closing": true
        },
        {
            "item_id": 105,
            "invoice_id": 137,
            "invoice_item_number": 6,
            "product_id": 14,
            "quantity": 100,
            "cost": 370,
            "discount": 183,
            "self-closing": true
        },
        {
            "item_id": 106,
            "invoice_id": 358,
            "invoice_item_number": 1,
            "product_id": 3,
            "quantity": 79,
            "cost": 620,
            "discount": 762,
            "self-closing": true
        },
        {
            "item_id": 107,
            "invoice_id": 380,
            "invoice_item_number": 4,
            "product_id": 29,
            "quantity": 20,
            "cost": 689,
            "discount": 58,
            "self-closing": true
        },
        {
            "item_id": 108,
            "invoice_id": 315,
            "invoice_item_number": 8,
            "product_id": 4,
            "quantity": 81,
            "cost": 1128,
            "discount": 745,
            "self-closing": true
        },
        {
            "item_id": 109,
            "invoice_id": 333,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 78,
            "cost": 456,
            "discount": 164,
            "self-closing": true
        },
        {
            "item_id": 110,
            "invoice_id": 378,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 15,
            "cost": 663,
            "discount": 265,
            "self-closing": true
        },
        {
            "item_id": 111,
            "invoice_id": 184,
            "invoice_item_number": 7,
            "product_id": 29,
            "quantity": 21,
            "cost": 1067,
            "discount": 454,
            "self-closing": true
        },
        {
            "item_id": 112,
            "invoice_id": 373,
            "invoice_item_number": 9,
            "product_id": 4,
            "quantity": 50,
            "cost": 1234,
            "discount": 530,
            "self-closing": true
        },
        {
            "item_id": 113,
            "invoice_id": 285,
            "invoice_item_number": 6,
            "product_id": 6,
            "quantity": 18,
            "cost": 1452,
            "discount": 610,
            "self-closing": true
        },
        {
            "item_id": 114,
            "invoice_id": 123,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 69,
            "cost": 526,
            "discount": 978,
            "self-closing": true
        },
        {
            "item_id": 115,
            "invoice_id": 98,
            "invoice_item_number": 5,
            "product_id": 21,
            "quantity": 91,
            "cost": 479,
            "discount": 349,
            "self-closing": true
        },
        {
            "item_id": 116,
            "invoice_id": 250,
            "invoice_item_number": 3,
            "product_id": 6,
            "quantity": 32,
            "cost": 1107,
            "discount": 864,
            "self-closing": true
        },
        {
            "item_id": 117,
            "invoice_id": 99,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 27,
            "cost": 172,
            "discount": 243,
            "self-closing": true
        },
        {
            "item_id": 118,
            "invoice_id": 327,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 25,
            "cost": 731,
            "discount": 987,
            "self-closing": true
        },
        {
            "item_id": 119,
            "invoice_id": 96,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 17,
            "cost": 140,
            "discount": 83,
            "self-closing": true
        },
        {
            "item_id": 120,
            "invoice_id": 265,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 59,
            "cost": 515,
            "discount": 679,
            "self-closing": true
        },
        {
            "item_id": 121,
            "invoice_id": 390,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 63,
            "cost": 249,
            "discount": 885,
            "self-closing": true
        },
        {
            "item_id": 122,
            "invoice_id": 179,
            "invoice_item_number": 9,
            "product_id": 3,
            "quantity": 39,
            "cost": 908,
            "discount": 525,
            "self-closing": true
        },
        {
            "item_id": 123,
            "invoice_id": 289,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 61,
            "cost": 1492,
            "discount": 832,
            "self-closing": true
        },
        {
            "item_id": 124,
            "invoice_id": 101,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 58,
            "cost": 1465,
            "discount": 995,
            "self-closing": true
        },
        {
            "item_id": 125,
            "invoice_id": 178,
            "invoice_item_number": 1,
            "product_id": 27,
            "quantity": 31,
            "cost": 782,
            "discount": 337,
            "self-closing": true
        },
        {
            "item_id": 126,
            "invoice_id": 352,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 33,
            "cost": 788,
            "discount": 548,
            "self-closing": true
        },
        {
            "item_id": 127,
            "invoice_id": 314,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 22,
            "cost": 175,
            "discount": 850,
            "self-closing": true
        },
        {
            "item_id": 128,
            "invoice_id": 236,
            "invoice_item_number": 4,
            "product_id": 21,
            "quantity": 14,
            "cost": 199,
            "discount": 382,
            "self-closing": true
        },
        {
            "item_id": 129,
            "invoice_id": 230,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 87,
            "cost": 1303,
            "discount": 753,
            "self-closing": true
        },
        {
            "item_id": 130,
            "invoice_id": 287,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 38,
            "cost": 715,
            "discount": 612,
            "self-closing": true
        },
        {
            "item_id": 131,
            "invoice_id": 228,
            "invoice_item_number": 7,
            "product_id": 19,
            "quantity": 64,
            "cost": 1397,
            "discount": 361,
            "self-closing": true
        },
        {
            "item_id": 132,
            "invoice_id": 213,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 53,
            "cost": 1251,
            "discount": 396,
            "self-closing": true
        },
        {
            "item_id": 133,
            "invoice_id": 161,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 91,
            "cost": 855,
            "discount": 625,
            "self-closing": true
        },
        {
            "item_id": 134,
            "invoice_id": 327,
            "invoice_item_number": 3,
            "product_id": 14,
            "quantity": 36,
            "cost": 796,
            "discount": 581,
            "self-closing": true
        },
        {
            "item_id": 135,
            "invoice_id": 238,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 68,
            "cost": 827,
            "discount": 390,
            "self-closing": true
        },
        {
            "item_id": 136,
            "invoice_id": 20,
            "invoice_item_number": 1,
            "product_id": 6,
            "quantity": 61,
            "cost": 1094,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 137,
            "invoice_id": 153,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 67,
            "cost": 536,
            "discount": 373,
            "self-closing": true
        },
        {
            "item_id": 138,
            "invoice_id": 141,
            "invoice_item_number": 2,
            "product_id": 19,
            "quantity": 56,
            "cost": 813,
            "discount": 760,
            "self-closing": true
        },
        {
            "item_id": 139,
            "invoice_id": 198,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 85,
            "cost": 469,
            "discount": 430,
            "self-closing": true
        },
        {
            "item_id": 140,
            "invoice_id": 129,
            "invoice_item_number": 8,
            "product_id": 7,
            "quantity": 21,
            "cost": 462,
            "discount": 780,
            "self-closing": true
        },
        {
            "item_id": 141,
            "invoice_id": 311,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 56,
            "cost": 852,
            "discount": 249,
            "self-closing": true
        },
        {
            "item_id": 142,
            "invoice_id": 171,
            "invoice_item_number": 1,
            "product_id": 5,
            "quantity": 91,
            "cost": 597,
            "discount": 407,
            "self-closing": true
        },
        {
            "item_id": 143,
            "invoice_id": 380,
            "invoice_item_number": 6,
            "product_id": 30,
            "quantity": 14,
            "cost": 501,
            "discount": 275,
            "self-closing": true
        },
        {
            "item_id": 144,
            "invoice_id": 194,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 37,
            "cost": 1129,
            "discount": 426,
            "self-closing": true
        },
        {
            "item_id": 145,
            "invoice_id": 220,
            "invoice_item_number": 7,
            "product_id": 21,
            "quantity": 65,
            "cost": 648,
            "discount": 223,
            "self-closing": true
        },
        {
            "item_id": 146,
            "invoice_id": 117,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 29,
            "cost": 715,
            "discount": 62,
            "self-closing": true
        },
        {
            "item_id": 147,
            "invoice_id": 153,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 26,
            "cost": 1156,
            "discount": 575,
            "self-closing": true
        },
        {
            "item_id": 148,
            "invoice_id": 210,
            "invoice_item_number": 6,
            "product_id": 4,
            "quantity": 92,
            "cost": 450,
            "discount": 387,
            "self-closing": true
        },
        {
            "item_id": 149,
            "invoice_id": 210,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 20,
            "cost": 1368,
            "discount": 556,
            "self-closing": true
        },
        {
            "item_id": 150,
            "invoice_id": 360,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 45,
            "cost": 569,
            "discount": 286,
            "self-closing": true
        },
        {
            "item_id": 151,
            "invoice_id": 174,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 46,
            "cost": 875,
            "discount": 395,
            "self-closing": true
        },
        {
            "item_id": 152,
            "invoice_id": 40,
            "invoice_item_number": 7,
            "product_id": 22,
            "quantity": 15,
            "cost": 44,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 153,
            "invoice_id": 379,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 75,
            "cost": 919,
            "discount": 782,
            "self-closing": true
        },
        {
            "item_id": 154,
            "invoice_id": 221,
            "invoice_item_number": 7,
            "product_id": 9,
            "quantity": 38,
            "cost": 474,
            "discount": 768,
            "self-closing": true
        },
        {
            "item_id": 155,
            "invoice_id": 35,
            "invoice_item_number": 5,
            "product_id": 7,
            "quantity": 91,
            "cost": 70,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 156,
            "invoice_id": 28,
            "invoice_item_number": 1,
            "product_id": 28,
            "quantity": 81,
            "cost": 1494,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 157,
            "invoice_id": 69,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 55,
            "cost": 754,
            "discount": 508,
            "self-closing": true
        },
        {
            "item_id": 158,
            "invoice_id": 252,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 37,
            "cost": 1367,
            "discount": 273,
            "self-closing": true
        },
        {
            "item_id": 159,
            "invoice_id": 177,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 22,
            "cost": 706,
            "discount": 642,
            "self-closing": true
        },
        {
            "item_id": 160,
            "invoice_id": 317,
            "invoice_item_number": 9,
            "product_id": 11,
            "quantity": 73,
            "cost": 91,
            "discount": 889,
            "self-closing": true
        },
        {
            "item_id": 161,
            "invoice_id": 394,
            "invoice_item_number": 4,
            "product_id": 12,
            "quantity": 45,
            "cost": 1214,
            "discount": 579,
            "self-closing": true
        },
        {
            "item_id": 162,
            "invoice_id": 300,
            "invoice_item_number": 9,
            "product_id": 4,
            "quantity": 54,
            "cost": 1370,
            "discount": 168,
            "self-closing": true
        },
        {
            "item_id": 163,
            "invoice_id": 359,
            "invoice_item_number": 6,
            "product_id": 19,
            "quantity": 36,
            "cost": 1123,
            "discount": 442,
            "self-closing": true
        },
        {
            "item_id": 164,
            "invoice_id": 330,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 67,
            "cost": 408,
            "discount": 375,
            "self-closing": true
        },
        {
            "item_id": 165,
            "invoice_id": 209,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 64,
            "cost": 1417,
            "discount": 431,
            "self-closing": true
        },
        {
            "item_id": 166,
            "invoice_id": 122,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 77,
            "cost": 43,
            "discount": 498,
            "self-closing": true
        },
        {
            "item_id": 167,
            "invoice_id": 192,
            "invoice_item_number": 5,
            "product_id": 11,
            "quantity": 95,
            "cost": 332,
            "discount": 701,
            "self-closing": true
        },
        {
            "item_id": 168,
            "invoice_id": 330,
            "invoice_item_number": 3,
            "product_id": 25,
            "quantity": 55,
            "cost": 710,
            "discount": 909,
            "self-closing": true
        },
        {
            "item_id": 169,
            "invoice_id": 124,
            "invoice_item_number": 1,
            "product_id": 16,
            "quantity": 13,
            "cost": 161,
            "discount": 929,
            "self-closing": true
        },
        {
            "item_id": 170,
            "invoice_id": 294,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 76,
            "cost": 654,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 171,
            "invoice_id": 40,
            "invoice_item_number": 8,
            "product_id": 9,
            "quantity": 11,
            "cost": 632,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 172,
            "invoice_id": 312,
            "invoice_item_number": 1,
            "product_id": 26,
            "quantity": 25,
            "cost": 1230,
            "discount": 239,
            "self-closing": true
        },
        {
            "item_id": 173,
            "invoice_id": 261,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 47,
            "cost": 812,
            "discount": 896,
            "self-closing": true
        },
        {
            "item_id": 174,
            "invoice_id": 353,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 94,
            "cost": 1090,
            "discount": 150,
            "self-closing": true
        },
        {
            "item_id": 175,
            "invoice_id": 328,
            "invoice_item_number": 2,
            "product_id": 18,
            "quantity": 94,
            "cost": 643,
            "discount": 751,
            "self-closing": true
        },
        {
            "item_id": 176,
            "invoice_id": 287,
            "invoice_item_number": 8,
            "product_id": 24,
            "quantity": 80,
            "cost": 1053,
            "discount": 161,
            "self-closing": true
        },
        {
            "item_id": 177,
            "invoice_id": 376,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 36,
            "cost": 463,
            "discount": 482,
            "self-closing": true
        },
        {
            "item_id": 178,
            "invoice_id": 238,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 58,
            "cost": 1158,
            "discount": 55,
            "self-closing": true
        },
        {
            "item_id": 179,
            "invoice_id": 87,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 83,
            "cost": 185,
            "discount": 57,
            "self-closing": true
        },
        {
            "item_id": 180,
            "invoice_id": 115,
            "invoice_item_number": 7,
            "product_id": 7,
            "quantity": 63,
            "cost": 50,
            "discount": 718,
            "self-closing": true
        },
        {
            "item_id": 181,
            "invoice_id": 209,
            "invoice_item_number": 9,
            "product_id": 14,
            "quantity": 76,
            "cost": 734,
            "discount": 866,
            "self-closing": true
        },
        {
            "item_id": 182,
            "invoice_id": 9,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 25,
            "cost": 432,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 183,
            "invoice_id": 295,
            "invoice_item_number": 8,
            "product_id": 14,
            "quantity": 62,
            "cost": 93,
            "discount": 982,
            "self-closing": true
        },
        {
            "item_id": 184,
            "invoice_id": 220,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 15,
            "cost": 1388,
            "discount": 324,
            "self-closing": true
        },
        {
            "item_id": 185,
            "invoice_id": 14,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 76,
            "cost": 470,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 186,
            "invoice_id": 283,
            "invoice_item_number": 7,
            "product_id": 5,
            "quantity": 21,
            "cost": 922,
            "discount": 310,
            "self-closing": true
        },
        {
            "item_id": 187,
            "invoice_id": 214,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 40,
            "cost": 81,
            "discount": 659,
            "self-closing": true
        },
        {
            "item_id": 188,
            "invoice_id": 279,
            "invoice_item_number": 9,
            "product_id": 6,
            "quantity": 77,
            "cost": 1205,
            "discount": 503,
            "self-closing": true
        },
        {
            "item_id": 189,
            "invoice_id": 320,
            "invoice_item_number": 2,
            "product_id": 16,
            "quantity": 33,
            "cost": 1171,
            "discount": 211,
            "self-closing": true
        },
        {
            "item_id": 190,
            "invoice_id": 178,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 60,
            "cost": 915,
            "discount": 359,
            "self-closing": true
        },
        {
            "item_id": 191,
            "invoice_id": 297,
            "invoice_item_number": 4,
            "product_id": 16,
            "quantity": 66,
            "cost": 182,
            "discount": 741,
            "self-closing": true
        },
        {
            "item_id": 192,
            "invoice_id": 286,
            "invoice_item_number": 7,
            "product_id": 3,
            "quantity": 86,
            "cost": 798,
            "discount": 509,
            "self-closing": true
        },
        {
            "item_id": 193,
            "invoice_id": 304,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 48,
            "cost": 582,
            "discount": 160,
            "self-closing": true
        },
        {
            "item_id": 194,
            "invoice_id": 144,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 60,
            "cost": 226,
            "discount": 126,
            "self-closing": true
        },
        {
            "item_id": 195,
            "invoice_id": 194,
            "invoice_item_number": 1,
            "product_id": 11,
            "quantity": 25,
            "cost": 59,
            "discount": 39,
            "self-closing": true
        },
        {
            "item_id": 196,
            "invoice_id": 58,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 90,
            "cost": 358,
            "discount": 147,
            "self-closing": true
        },
        {
            "item_id": 197,
            "invoice_id": 40,
            "invoice_item_number": 9,
            "product_id": 6,
            "quantity": 20,
            "cost": 88,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 198,
            "invoice_id": 250,
            "invoice_item_number": 6,
            "product_id": 23,
            "quantity": 96,
            "cost": 421,
            "discount": 676,
            "self-closing": true
        },
        {
            "item_id": 199,
            "invoice_id": 175,
            "invoice_item_number": 1,
            "product_id": 30,
            "quantity": 81,
            "cost": 169,
            "discount": 973,
            "self-closing": true
        },
        {
            "item_id": 200,
            "invoice_id": 289,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 75,
            "cost": 965,
            "discount": 874,
            "self-closing": true
        },
        {
            "item_id": 201,
            "invoice_id": 370,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 56,
            "cost": 173,
            "discount": 515,
            "self-closing": true
        },
        {
            "item_id": 202,
            "invoice_id": 57,
            "invoice_item_number": 1,
            "product_id": 27,
            "quantity": 55,
            "cost": 1357,
            "discount": 366,
            "self-closing": true
        },
        {
            "item_id": 203,
            "invoice_id": 254,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 94,
            "cost": 537,
            "discount": 550,
            "self-closing": true
        },
        {
            "item_id": 204,
            "invoice_id": 5,
            "invoice_item_number": 1,
            "product_id": 13,
            "quantity": 84,
            "cost": 86,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 205,
            "invoice_id": 30,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 74,
            "cost": 433,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 206,
            "invoice_id": 354,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 54,
            "cost": 949,
            "discount": 226,
            "self-closing": true
        },
        {
            "item_id": 207,
            "invoice_id": 259,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 45,
            "cost": 1371,
            "discount": 549,
            "self-closing": true
        },
        {
            "item_id": 208,
            "invoice_id": 90,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 37,
            "cost": 539,
            "discount": 715,
            "self-closing": true
        },
        {
            "item_id": 209,
            "invoice_id": 13,
            "invoice_item_number": 1,
            "product_id": 4,
            "quantity": 96,
            "cost": 804,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 210,
            "invoice_id": 96,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 58,
            "cost": 914,
            "discount": 237,
            "self-closing": true
        },
        {
            "item_id": 211,
            "invoice_id": 7,
            "invoice_item_number": 1,
            "product_id": 14,
            "quantity": 71,
            "cost": 934,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 212,
            "invoice_id": 270,
            "invoice_item_number": 9,
            "product_id": 11,
            "quantity": 69,
            "cost": 297,
            "discount": 578,
            "self-closing": true
        },
        {
            "item_id": 213,
            "invoice_id": 372,
            "invoice_item_number": 4,
            "product_id": 2,
            "quantity": 40,
            "cost": 55,
            "discount": 33,
            "self-closing": true
        },
        {
            "item_id": 214,
            "invoice_id": 296,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 57,
            "cost": 1408,
            "discount": 907,
            "self-closing": true
        },
        {
            "item_id": 215,
            "invoice_id": 110,
            "invoice_item_number": 6,
            "product_id": 7,
            "quantity": 20,
            "cost": 295,
            "discount": 620,
            "self-closing": true
        },
        {
            "item_id": 216,
            "invoice_id": 269,
            "invoice_item_number": 2,
            "product_id": 19,
            "quantity": 35,
            "cost": 1314,
            "discount": 668,
            "self-closing": true
        },
        {
            "item_id": 217,
            "invoice_id": 298,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 37,
            "cost": 614,
            "discount": 827,
            "self-closing": true
        },
        {
            "item_id": 218,
            "invoice_id": 96,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 59,
            "cost": 1473,
            "discount": 899,
            "self-closing": true
        },
        {
            "item_id": 219,
            "invoice_id": 314,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 27,
            "cost": 245,
            "discount": 573,
            "self-closing": true
        },
        {
            "item_id": 220,
            "invoice_id": 211,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 57,
            "cost": 803,
            "discount": 816,
            "self-closing": true
        },
        {
            "item_id": 221,
            "invoice_id": 230,
            "invoice_item_number": 7,
            "product_id": 15,
            "quantity": 98,
            "cost": 726,
            "discount": 776,
            "self-closing": true
        },
        {
            "item_id": 222,
            "invoice_id": 40,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 54,
            "cost": 111,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 223,
            "invoice_id": 324,
            "invoice_item_number": 8,
            "product_id": 16,
            "quantity": 74,
            "cost": 219,
            "discount": 96,
            "self-closing": true
        },
        {
            "item_id": 224,
            "invoice_id": 100,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 37,
            "cost": 1379,
            "discount": 457,
            "self-closing": true
        },
        {
            "item_id": 225,
            "invoice_id": 239,
            "invoice_item_number": 9,
            "product_id": 30,
            "quantity": 11,
            "cost": 66,
            "discount": 587,
            "self-closing": true
        },
        {
            "item_id": 226,
            "invoice_id": 339,
            "invoice_item_number": 1,
            "product_id": 13,
            "quantity": 56,
            "cost": 905,
            "discount": 702,
            "self-closing": true
        },
        {
            "item_id": 227,
            "invoice_id": 307,
            "invoice_item_number": 4,
            "product_id": 20,
            "quantity": 69,
            "cost": 1166,
            "discount": 322,
            "self-closing": true
        },
        {
            "item_id": 228,
            "invoice_id": 58,
            "invoice_item_number": 4,
            "product_id": 6,
            "quantity": 51,
            "cost": 131,
            "discount": 898,
            "self-closing": true
        },
        {
            "item_id": 229,
            "invoice_id": 246,
            "invoice_item_number": 1,
            "product_id": 12,
            "quantity": 21,
            "cost": 1329,
            "discount": 345,
            "self-closing": true
        },
        {
            "item_id": 230,
            "invoice_id": 124,
            "invoice_item_number": 2,
            "product_id": 24,
            "quantity": 71,
            "cost": 260,
            "discount": 964,
            "self-closing": true
        },
        {
            "item_id": 231,
            "invoice_id": 97,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 85,
            "cost": 270,
            "discount": 156,
            "self-closing": true
        },
        {
            "item_id": 232,
            "invoice_id": 251,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 24,
            "cost": 714,
            "discount": 631,
            "self-closing": true
        },
        {
            "item_id": 233,
            "invoice_id": 144,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 16,
            "cost": 1358,
            "discount": 612,
            "self-closing": true
        },
        {
            "item_id": 234,
            "invoice_id": 40,
            "invoice_item_number": 3,
            "product_id": 25,
            "quantity": 20,
            "cost": 234,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 235,
            "invoice_id": 303,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 66,
            "cost": 862,
            "discount": 88,
            "self-closing": true
        },
        {
            "item_id": 236,
            "invoice_id": 175,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 87,
            "cost": 1201,
            "discount": 878,
            "self-closing": true
        },
        {
            "item_id": 237,
            "invoice_id": 40,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 100,
            "cost": 3456,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 238,
            "invoice_id": 314,
            "invoice_item_number": 5,
            "product_id": 11,
            "quantity": 77,
            "cost": 827,
            "discount": 750,
            "self-closing": true
        },
        {
            "item_id": 239,
            "invoice_id": 40,
            "invoice_item_number": 1,
            "product_id": 10,
            "quantity": 6,
            "cost": 645,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 240,
            "invoice_id": 300,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 66,
            "cost": 916,
            "discount": 674,
            "self-closing": true
        },
        {
            "item_id": 241,
            "invoice_id": 194,
            "invoice_item_number": 4,
            "product_id": 2,
            "quantity": 96,
            "cost": 187,
            "discount": 863,
            "self-closing": true
        },
        {
            "item_id": 242,
            "invoice_id": 213,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 13,
            "cost": 243,
            "discount": 65,
            "self-closing": true
        },
        {
            "item_id": 243,
            "invoice_id": 313,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 89,
            "cost": 1368,
            "discount": 505,
            "self-closing": true
        },
        {
            "item_id": 244,
            "invoice_id": 179,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 23,
            "cost": 842,
            "discount": 15,
            "self-closing": true
        },
        {
            "item_id": 245,
            "invoice_id": 214,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 26,
            "cost": 635,
            "discount": 177,
            "self-closing": true
        },
        {
            "item_id": 246,
            "invoice_id": 32,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 64,
            "cost": 1263,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 247,
            "invoice_id": 322,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 20,
            "cost": 330,
            "discount": 277,
            "self-closing": true
        },
        {
            "item_id": 248,
            "invoice_id": 345,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 11,
            "cost": 612,
            "discount": 935,
            "self-closing": true
        },
        {
            "item_id": 249,
            "invoice_id": 191,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 80,
            "cost": 562,
            "discount": 619,
            "self-closing": true
        },
        {
            "item_id": 250,
            "invoice_id": 358,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 61,
            "cost": 944,
            "discount": 547,
            "self-closing": true
        },
        {
            "item_id": 251,
            "invoice_id": 175,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 56,
            "cost": 1174,
            "discount": 858,
            "self-closing": true
        },
        {
            "item_id": 252,
            "invoice_id": 243,
            "invoice_item_number": 2,
            "product_id": 7,
            "quantity": 42,
            "cost": 1427,
            "discount": 393,
            "self-closing": true
        },
        {
            "item_id": 253,
            "invoice_id": 89,
            "invoice_item_number": 3,
            "product_id": 19,
            "quantity": 16,
            "cost": 1073,
            "discount": 929,
            "self-closing": true
        },
        {
            "item_id": 254,
            "invoice_id": 336,
            "invoice_item_number": 6,
            "product_id": 16,
            "quantity": 27,
            "cost": 346,
            "discount": 779,
            "self-closing": true
        },
        {
            "item_id": 255,
            "invoice_id": 135,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 89,
            "cost": 677,
            "discount": 428,
            "self-closing": true
        },
        {
            "item_id": 256,
            "invoice_id": 272,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 89,
            "cost": 530,
            "discount": 650,
            "self-closing": true
        },
        {
            "item_id": 257,
            "invoice_id": 224,
            "invoice_item_number": 3,
            "product_id": 8,
            "quantity": 32,
            "cost": 1422,
            "discount": 231,
            "self-closing": true
        },
        {
            "item_id": 258,
            "invoice_id": 30,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 20,
            "cost": 198,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 259,
            "invoice_id": 382,
            "invoice_item_number": 2,
            "product_id": 22,
            "quantity": 99,
            "cost": 678,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 260,
            "invoice_id": 139,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 66,
            "cost": 896,
            "discount": 188,
            "self-closing": true
        },
        {
            "item_id": 261,
            "invoice_id": 256,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 55,
            "cost": 1440,
            "discount": 992,
            "self-closing": true
        },
        {
            "item_id": 262,
            "invoice_id": 202,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 10,
            "cost": 216,
            "discount": 988,
            "self-closing": true
        },
        {
            "item_id": 263,
            "invoice_id": 41,
            "invoice_item_number": 1,
            "product_id": 1,
            "quantity": 15,
            "cost": 1000,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 264,
            "invoice_id": 59,
            "invoice_item_number": 8,
            "product_id": 6,
            "quantity": 84,
            "cost": 1281,
            "discount": 234,
            "self-closing": true
        },
        {
            "item_id": 265,
            "invoice_id": 361,
            "invoice_item_number": 4,
            "product_id": 29,
            "quantity": 69,
            "cost": 1199,
            "discount": 767,
            "self-closing": true
        },
        {
            "item_id": 266,
            "invoice_id": 369,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 74,
            "cost": 437,
            "discount": 729,
            "self-closing": true
        },
        {
            "item_id": 267,
            "invoice_id": 225,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 63,
            "cost": 794,
            "discount": 163,
            "self-closing": true
        },
        {
            "item_id": 268,
            "invoice_id": 216,
            "invoice_item_number": 7,
            "product_id": 12,
            "quantity": 50,
            "cost": 459,
            "discount": 742,
            "self-closing": true
        },
        {
            "item_id": 269,
            "invoice_id": 70,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 27,
            "cost": 229,
            "discount": 16,
            "self-closing": true
        },
        {
            "item_id": 270,
            "invoice_id": 187,
            "invoice_item_number": 5,
            "product_id": 8,
            "quantity": 95,
            "cost": 718,
            "discount": 757,
            "self-closing": true
        },
        {
            "item_id": 271,
            "invoice_id": 319,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 70,
            "cost": 99,
            "discount": 209,
            "self-closing": true
        },
        {
            "item_id": 272,
            "invoice_id": 248,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 29,
            "cost": 457,
            "discount": 933,
            "self-closing": true
        },
        {
            "item_id": 273,
            "invoice_id": 41,
            "invoice_item_number": 2,
            "product_id": 30,
            "quantity": 15,
            "cost": 500,
            "discount": 50,
            "self-closing": true
        },
        {
            "item_id": 274,
            "invoice_id": 266,
            "invoice_item_number": 5,
            "product_id": 7,
            "quantity": 77,
            "cost": 71,
            "discount": 865,
            "self-closing": true
        },
        {
            "item_id": 275,
            "invoice_id": 42,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 35,
            "cost": 555,
            "discount": 67,
            "self-closing": true
        },
        {
            "item_id": 276,
            "invoice_id": 65,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 85,
            "cost": 893,
            "discount": 372,
            "self-closing": true
        },
        {
            "item_id": 277,
            "invoice_id": 329,
            "invoice_item_number": 6,
            "product_id": 30,
            "quantity": 44,
            "cost": 679,
            "discount": 924,
            "self-closing": true
        },
        {
            "item_id": 278,
            "invoice_id": 321,
            "invoice_item_number": 3,
            "product_id": 25,
            "quantity": 12,
            "cost": 693,
            "discount": 284,
            "self-closing": true
        },
        {
            "item_id": 279,
            "invoice_id": 42,
            "invoice_item_number": 1,
            "product_id": 28,
            "quantity": 60,
            "cost": 333,
            "discount": 45,
            "self-closing": true
        },
        {
            "item_id": 280,
            "invoice_id": 270,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 91,
            "cost": 1423,
            "discount": 580,
            "self-closing": true
        },
        {
            "item_id": 281,
            "invoice_id": 43,
            "invoice_item_number": 1,
            "product_id": 6,
            "quantity": 13,
            "cost": 894,
            "discount": 34,
            "self-closing": true
        },
        {
            "item_id": 282,
            "invoice_id": 236,
            "invoice_item_number": 9,
            "product_id": 26,
            "quantity": 69,
            "cost": 1303,
            "discount": 948,
            "self-closing": true
        },
        {
            "item_id": 283,
            "invoice_id": 377,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 34,
            "cost": 377,
            "discount": 661,
            "self-closing": true
        },
        {
            "item_id": 284,
            "invoice_id": 200,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 35,
            "cost": 487,
            "discount": 863,
            "self-closing": true
        },
        {
            "item_id": 285,
            "invoice_id": 34,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 95,
            "cost": 428,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 286,
            "invoice_id": 231,
            "invoice_item_number": 9,
            "product_id": 11,
            "quantity": 15,
            "cost": 767,
            "discount": 977,
            "self-closing": true
        },
        {
            "item_id": 287,
            "invoice_id": 231,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 89,
            "cost": 1138,
            "discount": 581,
            "self-closing": true
        },
        {
            "item_id": 288,
            "invoice_id": 319,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 17,
            "cost": 1474,
            "discount": 75,
            "self-closing": true
        },
        {
            "item_id": 289,
            "invoice_id": 216,
            "invoice_item_number": 4,
            "product_id": 3,
            "quantity": 88,
            "cost": 709,
            "discount": 103,
            "self-closing": true
        },
        {
            "item_id": 290,
            "invoice_id": 231,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 88,
            "cost": 532,
            "discount": 430,
            "self-closing": true
        },
        {
            "item_id": 291,
            "invoice_id": 207,
            "invoice_item_number": 6,
            "product_id": 6,
            "quantity": 31,
            "cost": 211,
            "discount": 856,
            "self-closing": true
        },
        {
            "item_id": 292,
            "invoice_id": 331,
            "invoice_item_number": 6,
            "product_id": 29,
            "quantity": 11,
            "cost": 1225,
            "discount": 150,
            "self-closing": true
        },
        {
            "item_id": 293,
            "invoice_id": 55,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 99,
            "cost": 618,
            "discount": 683,
            "self-closing": true
        },
        {
            "item_id": 294,
            "invoice_id": 301,
            "invoice_item_number": 8,
            "product_id": 18,
            "quantity": 57,
            "cost": 723,
            "discount": 589,
            "self-closing": true
        },
        {
            "item_id": 295,
            "invoice_id": 58,
            "invoice_item_number": 5,
            "product_id": 13,
            "quantity": 83,
            "cost": 1388,
            "discount": 96,
            "self-closing": true
        },
        {
            "item_id": 296,
            "invoice_id": 400,
            "invoice_item_number": 4,
            "product_id": 12,
            "quantity": 84,
            "cost": 134,
            "discount": 221,
            "self-closing": true
        },
        {
            "item_id": 297,
            "invoice_id": 196,
            "invoice_item_number": 1,
            "product_id": 22,
            "quantity": 83,
            "cost": 1475,
            "discount": 463,
            "self-closing": true
        },
        {
            "item_id": 298,
            "invoice_id": 188,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 65,
            "cost": 1216,
            "discount": 341,
            "self-closing": true
        },
        {
            "item_id": 299,
            "invoice_id": 38,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 68,
            "cost": 349,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 300,
            "invoice_id": 229,
            "invoice_item_number": 2,
            "product_id": 25,
            "quantity": 74,
            "cost": 295,
            "discount": 866,
            "self-closing": true
        },
        {
            "item_id": 301,
            "invoice_id": 29,
            "invoice_item_number": 7,
            "product_id": 17,
            "quantity": 39,
            "cost": 946,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 302,
            "invoice_id": 340,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 33,
            "cost": 785,
            "discount": 636,
            "self-closing": true
        },
        {
            "item_id": 303,
            "invoice_id": 44,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 30,
            "cost": 1500,
            "discount": 200,
            "self-closing": true
        },
        {
            "item_id": 304,
            "invoice_id": 371,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 96,
            "cost": 292,
            "discount": 27,
            "self-closing": true
        },
        {
            "item_id": 305,
            "invoice_id": 239,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 23,
            "cost": 1481,
            "discount": 540,
            "self-closing": true
        },
        {
            "item_id": 306,
            "invoice_id": 260,
            "invoice_item_number": 5,
            "product_id": 20,
            "quantity": 11,
            "cost": 871,
            "discount": 370,
            "self-closing": true
        },
        {
            "item_id": 307,
            "invoice_id": 346,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 85,
            "cost": 826,
            "discount": 592,
            "self-closing": true
        },
        {
            "item_id": 308,
            "invoice_id": 87,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 73,
            "cost": 179,
            "discount": 410,
            "self-closing": true
        },
        {
            "item_id": 309,
            "invoice_id": 94,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 22,
            "cost": 793,
            "discount": 603,
            "self-closing": true
        },
        {
            "item_id": 310,
            "invoice_id": 309,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 43,
            "cost": 647,
            "discount": 508,
            "self-closing": true
        },
        {
            "item_id": 311,
            "invoice_id": 264,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 70,
            "cost": 227,
            "discount": 573,
            "self-closing": true
        },
        {
            "item_id": 312,
            "invoice_id": 267,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 88,
            "cost": 936,
            "discount": 704,
            "self-closing": true
        },
        {
            "item_id": 313,
            "invoice_id": 281,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 14,
            "cost": 1020,
            "discount": 184,
            "self-closing": true
        },
        {
            "item_id": 314,
            "invoice_id": 178,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 54,
            "cost": 530,
            "discount": 845,
            "self-closing": true
        },
        {
            "item_id": 315,
            "invoice_id": 149,
            "invoice_item_number": 9,
            "product_id": 23,
            "quantity": 85,
            "cost": 1304,
            "discount": 128,
            "self-closing": true
        },
        {
            "item_id": 316,
            "invoice_id": 325,
            "invoice_item_number": 1,
            "product_id": 3,
            "quantity": 24,
            "cost": 325,
            "discount": 395,
            "self-closing": true
        },
        {
            "item_id": 317,
            "invoice_id": 44,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 50,
            "cost": 4500,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 318,
            "invoice_id": 298,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 38,
            "cost": 1230,
            "discount": 84,
            "self-closing": true
        },
        {
            "item_id": 319,
            "invoice_id": 24,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 77,
            "cost": 950,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 320,
            "invoice_id": 311,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 60,
            "cost": 1229,
            "discount": 29,
            "self-closing": true
        },
        {
            "item_id": 321,
            "invoice_id": 129,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 67,
            "cost": 834,
            "discount": 56,
            "self-closing": true
        },
        {
            "item_id": 322,
            "invoice_id": 189,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 39,
            "cost": 1468,
            "discount": 776,
            "self-closing": true
        },
        {
            "item_id": 323,
            "invoice_id": 192,
            "invoice_item_number": 7,
            "product_id": 19,
            "quantity": 89,
            "cost": 452,
            "discount": 448,
            "self-closing": true
        },
        {
            "item_id": 324,
            "invoice_id": 124,
            "invoice_item_number": 3,
            "product_id": 6,
            "quantity": 47,
            "cost": 793,
            "discount": 869,
            "self-closing": true
        },
        {
            "item_id": 325,
            "invoice_id": 20,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 31,
            "cost": 684,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 326,
            "invoice_id": 185,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 43,
            "cost": 1218,
            "discount": 517,
            "self-closing": true
        },
        {
            "item_id": 327,
            "invoice_id": 178,
            "invoice_item_number": 4,
            "product_id": 10,
            "quantity": 77,
            "cost": 1396,
            "discount": 201,
            "self-closing": true
        },
        {
            "item_id": 328,
            "invoice_id": 1,
            "invoice_item_number": 1,
            "product_id": 30,
            "quantity": 63,
            "cost": 1311,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 329,
            "invoice_id": 334,
            "invoice_item_number": 4,
            "product_id": 20,
            "quantity": 83,
            "cost": 1048,
            "discount": 983,
            "self-closing": true
        },
        {
            "item_id": 330,
            "invoice_id": 196,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 86,
            "cost": 1426,
            "discount": 80,
            "self-closing": true
        },
        {
            "item_id": 331,
            "invoice_id": 321,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 13,
            "cost": 643,
            "discount": 458,
            "self-closing": true
        },
        {
            "item_id": 332,
            "invoice_id": 44,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 18,
            "cost": 1200,
            "discount": 450,
            "self-closing": true
        },
        {
            "item_id": 333,
            "invoice_id": 84,
            "invoice_item_number": 8,
            "product_id": 8,
            "quantity": 18,
            "cost": 1345,
            "discount": 840,
            "self-closing": true
        },
        {
            "item_id": 334,
            "invoice_id": 113,
            "invoice_item_number": 2,
            "product_id": 22,
            "quantity": 63,
            "cost": 768,
            "discount": 428,
            "self-closing": true
        },
        {
            "item_id": 335,
            "invoice_id": 204,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 31,
            "cost": 1340,
            "discount": 141,
            "self-closing": true
        },
        {
            "item_id": 336,
            "invoice_id": 293,
            "invoice_item_number": 4,
            "product_id": 17,
            "quantity": 84,
            "cost": 338,
            "discount": 723,
            "self-closing": true
        },
        {
            "item_id": 337,
            "invoice_id": 216,
            "invoice_item_number": 4,
            "product_id": 20,
            "quantity": 77,
            "cost": 1444,
            "discount": 937,
            "self-closing": true
        },
        {
            "item_id": 338,
            "invoice_id": 217,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 85,
            "cost": 930,
            "discount": 389,
            "self-closing": true
        },
        {
            "item_id": 339,
            "invoice_id": 44,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 200,
            "cost": 10324,
            "discount": 800,
            "self-closing": true
        },
        {
            "item_id": 340,
            "invoice_id": 95,
            "invoice_item_number": 8,
            "product_id": 18,
            "quantity": 80,
            "cost": 1276,
            "discount": 722,
            "self-closing": true
        },
        {
            "item_id": 341,
            "invoice_id": 350,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 72,
            "cost": 899,
            "discount": 780,
            "self-closing": true
        },
        {
            "item_id": 342,
            "invoice_id": 137,
            "invoice_item_number": 6,
            "product_id": 28,
            "quantity": 24,
            "cost": 1223,
            "discount": 908,
            "self-closing": true
        },
        {
            "item_id": 343,
            "invoice_id": 15,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 23,
            "cost": 1171,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 344,
            "invoice_id": 25,
            "invoice_item_number": 2,
            "product_id": 7,
            "quantity": 19,
            "cost": 1228,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 345,
            "invoice_id": 44,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 5,
            "cost": 56,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 346,
            "invoice_id": 215,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 74,
            "cost": 1131,
            "discount": 411,
            "self-closing": true
        },
        {
            "item_id": 347,
            "invoice_id": 280,
            "invoice_item_number": 1,
            "product_id": 29,
            "quantity": 33,
            "cost": 558,
            "discount": 679,
            "self-closing": true
        },
        {
            "item_id": 348,
            "invoice_id": 391,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 85,
            "cost": 792,
            "discount": 745,
            "self-closing": true
        },
        {
            "item_id": 349,
            "invoice_id": 114,
            "invoice_item_number": 1,
            "product_id": 28,
            "quantity": 25,
            "cost": 1463,
            "discount": 282,
            "self-closing": true
        },
        {
            "item_id": 350,
            "invoice_id": 44,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 10,
            "cost": 1000,
            "discount": 50,
            "self-closing": true
        },
        {
            "item_id": 351,
            "invoice_id": 140,
            "invoice_item_number": 1,
            "product_id": 20,
            "quantity": 97,
            "cost": 555,
            "discount": 602,
            "self-closing": true
        },
        {
            "item_id": 352,
            "invoice_id": 186,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 75,
            "cost": 655,
            "discount": 945,
            "self-closing": true
        },
        {
            "item_id": 353,
            "invoice_id": 44,
            "invoice_item_number": 8,
            "product_id": 29,
            "quantity": 2,
            "cost": 45,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 354,
            "invoice_id": 25,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 28,
            "cost": 45,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 355,
            "invoice_id": 353,
            "invoice_item_number": 9,
            "product_id": 18,
            "quantity": 40,
            "cost": 737,
            "discount": 229,
            "self-closing": true
        },
        {
            "item_id": 356,
            "invoice_id": 334,
            "invoice_item_number": 5,
            "product_id": 28,
            "quantity": 33,
            "cost": 603,
            "discount": 691,
            "self-closing": true
        },
        {
            "item_id": 357,
            "invoice_id": 44,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 58,
            "cost": 4663,
            "discount": 124,
            "self-closing": true
        },
        {
            "item_id": 358,
            "invoice_id": 49,
            "invoice_item_number": 8,
            "product_id": 12,
            "quantity": 76,
            "cost": 544,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 359,
            "invoice_id": 66,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 24,
            "cost": 1473,
            "discount": 426,
            "self-closing": true
        },
        {
            "item_id": 360,
            "invoice_id": 234,
            "invoice_item_number": 4,
            "product_id": 11,
            "quantity": 95,
            "cost": 1157,
            "discount": 335,
            "self-closing": true
        },
        {
            "item_id": 361,
            "invoice_id": 386,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 41,
            "cost": 253,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 362,
            "invoice_id": 134,
            "invoice_item_number": 9,
            "product_id": 19,
            "quantity": 37,
            "cost": 609,
            "discount": 182,
            "self-closing": true
        },
        {
            "item_id": 363,
            "invoice_id": 204,
            "invoice_item_number": 3,
            "product_id": 15,
            "quantity": 46,
            "cost": 200,
            "discount": 749,
            "self-closing": true
        },
        {
            "item_id": 364,
            "invoice_id": 31,
            "invoice_item_number": 6,
            "product_id": 4,
            "quantity": 42,
            "cost": 565,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 365,
            "invoice_id": 45,
            "invoice_item_number": 1,
            "product_id": 4,
            "quantity": 10,
            "cost": 100,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 366,
            "invoice_id": 121,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 75,
            "cost": 744,
            "discount": 863,
            "self-closing": true
        },
        {
            "item_id": 367,
            "invoice_id": 378,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 50,
            "cost": 1383,
            "discount": 21,
            "self-closing": true
        },
        {
            "item_id": 368,
            "invoice_id": 89,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 14,
            "cost": 951,
            "discount": 95,
            "self-closing": true
        },
        {
            "item_id": 369,
            "invoice_id": 148,
            "invoice_item_number": 1,
            "product_id": 1,
            "quantity": 89,
            "cost": 467,
            "discount": 260,
            "self-closing": true
        },
        {
            "item_id": 370,
            "invoice_id": 114,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 31,
            "cost": 1158,
            "discount": 568,
            "self-closing": true
        },
        {
            "item_id": 371,
            "invoice_id": 213,
            "invoice_item_number": 5,
            "product_id": 27,
            "quantity": 54,
            "cost": 108,
            "discount": 730,
            "self-closing": true
        },
        {
            "item_id": 372,
            "invoice_id": 308,
            "invoice_item_number": 2,
            "product_id": 20,
            "quantity": 35,
            "cost": 527,
            "discount": 866,
            "self-closing": true
        },
        {
            "item_id": 373,
            "invoice_id": 35,
            "invoice_item_number": 4,
            "product_id": 21,
            "quantity": 56,
            "cost": 59,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 374,
            "invoice_id": 74,
            "invoice_item_number": 4,
            "product_id": 14,
            "quantity": 86,
            "cost": 157,
            "discount": 178,
            "self-closing": true
        },
        {
            "item_id": 375,
            "invoice_id": 110,
            "invoice_item_number": 7,
            "product_id": 15,
            "quantity": 70,
            "cost": 1135,
            "discount": 483,
            "self-closing": true
        },
        {
            "item_id": 376,
            "invoice_id": 124,
            "invoice_item_number": 4,
            "product_id": 14,
            "quantity": 49,
            "cost": 1115,
            "discount": 506,
            "self-closing": true
        },
        {
            "item_id": 377,
            "invoice_id": 307,
            "invoice_item_number": 9,
            "product_id": 13,
            "quantity": 72,
            "cost": 1209,
            "discount": 12,
            "self-closing": true
        },
        {
            "item_id": 378,
            "invoice_id": 277,
            "invoice_item_number": 8,
            "product_id": 9,
            "quantity": 12,
            "cost": 1237,
            "discount": 30,
            "self-closing": true
        },
        {
            "item_id": 379,
            "invoice_id": 84,
            "invoice_item_number": 9,
            "product_id": 26,
            "quantity": 40,
            "cost": 1309,
            "discount": 93,
            "self-closing": true
        },
        {
            "item_id": 380,
            "invoice_id": 281,
            "invoice_item_number": 4,
            "product_id": 20,
            "quantity": 48,
            "cost": 133,
            "discount": 259,
            "self-closing": true
        },
        {
            "item_id": 381,
            "invoice_id": 253,
            "invoice_item_number": 5,
            "product_id": 8,
            "quantity": 52,
            "cost": 417,
            "discount": 136,
            "self-closing": true
        },
        {
            "item_id": 382,
            "invoice_id": 306,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 37,
            "cost": 820,
            "discount": 151,
            "self-closing": true
        },
        {
            "item_id": 383,
            "invoice_id": 113,
            "invoice_item_number": 8,
            "product_id": 24,
            "quantity": 81,
            "cost": 873,
            "discount": 567,
            "self-closing": true
        },
        {
            "item_id": 384,
            "invoice_id": 219,
            "invoice_item_number": 9,
            "product_id": 28,
            "quantity": 81,
            "cost": 339,
            "discount": 518,
            "self-closing": true
        },
        {
            "item_id": 385,
            "invoice_id": 128,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 19,
            "cost": 638,
            "discount": 452,
            "self-closing": true
        },
        {
            "item_id": 386,
            "invoice_id": 357,
            "invoice_item_number": 9,
            "product_id": 16,
            "quantity": 86,
            "cost": 241,
            "discount": 992,
            "self-closing": true
        },
        {
            "item_id": 387,
            "invoice_id": 383,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 69,
            "cost": 57,
            "discount": 77,
            "self-closing": true
        },
        {
            "item_id": 388,
            "invoice_id": 186,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 72,
            "cost": 1284,
            "discount": 790,
            "self-closing": true
        },
        {
            "item_id": 389,
            "invoice_id": 207,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 14,
            "cost": 1259,
            "discount": 680,
            "self-closing": true
        },
        {
            "item_id": 390,
            "invoice_id": 234,
            "invoice_item_number": 2,
            "product_id": 8,
            "quantity": 35,
            "cost": 978,
            "discount": 594,
            "self-closing": true
        },
        {
            "item_id": 391,
            "invoice_id": 114,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 19,
            "cost": 609,
            "discount": 958,
            "self-closing": true
        },
        {
            "item_id": 392,
            "invoice_id": 306,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 53,
            "cost": 1085,
            "discount": 474,
            "self-closing": true
        },
        {
            "item_id": 393,
            "invoice_id": 124,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 58,
            "cost": 1342,
            "discount": 80,
            "self-closing": true
        },
        {
            "item_id": 394,
            "invoice_id": 312,
            "invoice_item_number": 2,
            "product_id": 8,
            "quantity": 94,
            "cost": 1249,
            "discount": 755,
            "self-closing": true
        },
        {
            "item_id": 395,
            "invoice_id": 119,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 65,
            "cost": 171,
            "discount": 264,
            "self-closing": true
        },
        {
            "item_id": 396,
            "invoice_id": 139,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 35,
            "cost": 1237,
            "discount": 707,
            "self-closing": true
        },
        {
            "item_id": 397,
            "invoice_id": 95,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 50,
            "cost": 89,
            "discount": 17,
            "self-closing": true
        },
        {
            "item_id": 398,
            "invoice_id": 163,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 45,
            "cost": 1053,
            "discount": 621,
            "self-closing": true
        },
        {
            "item_id": 399,
            "invoice_id": 173,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 51,
            "cost": 1042,
            "discount": 737,
            "self-closing": true
        },
        {
            "item_id": 400,
            "invoice_id": 283,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 83,
            "cost": 651,
            "discount": 121,
            "self-closing": true
        },
        {
            "item_id": 401,
            "invoice_id": 227,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 35,
            "cost": 1417,
            "discount": 814,
            "self-closing": true
        },
        {
            "item_id": 402,
            "invoice_id": 2,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 76,
            "cost": 679,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 403,
            "invoice_id": 1,
            "invoice_item_number": 5,
            "product_id": 13,
            "quantity": 20,
            "cost": 872,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 404,
            "invoice_id": 302,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 53,
            "cost": 687,
            "discount": 936,
            "self-closing": true
        },
        {
            "item_id": 405,
            "invoice_id": 329,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 84,
            "cost": 1145,
            "discount": 372,
            "self-closing": true
        },
        {
            "item_id": 406,
            "invoice_id": 396,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 36,
            "cost": 222,
            "discount": 155,
            "self-closing": true
        },
        {
            "item_id": 407,
            "invoice_id": 72,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 33,
            "cost": 117,
            "discount": 510,
            "self-closing": true
        },
        {
            "item_id": 408,
            "invoice_id": 45,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 23,
            "cost": 156,
            "discount": 13,
            "self-closing": true
        },
        {
            "item_id": 409,
            "invoice_id": 45,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 30,
            "cost": 1500,
            "discount": 100,
            "self-closing": true
        },
        {
            "item_id": 410,
            "invoice_id": 193,
            "invoice_item_number": 7,
            "product_id": 21,
            "quantity": 48,
            "cost": 323,
            "discount": 985,
            "self-closing": true
        },
        {
            "item_id": 411,
            "invoice_id": 161,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 41,
            "cost": 156,
            "discount": 553,
            "self-closing": true
        },
        {
            "item_id": 412,
            "invoice_id": 130,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 72,
            "cost": 354,
            "discount": 902,
            "self-closing": true
        },
        {
            "item_id": 413,
            "invoice_id": 327,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 40,
            "cost": 148,
            "discount": 661,
            "self-closing": true
        },
        {
            "item_id": 414,
            "invoice_id": 93,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 54,
            "cost": 228,
            "discount": 941,
            "self-closing": true
        },
        {
            "item_id": 415,
            "invoice_id": 242,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 89,
            "cost": 1277,
            "discount": 206,
            "self-closing": true
        },
        {
            "item_id": 416,
            "invoice_id": 246,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 58,
            "cost": 109,
            "discount": 253,
            "self-closing": true
        },
        {
            "item_id": 417,
            "invoice_id": 395,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 92,
            "cost": 1324,
            "discount": 433,
            "self-closing": true
        },
        {
            "item_id": 418,
            "invoice_id": 238,
            "invoice_item_number": 8,
            "product_id": 6,
            "quantity": 36,
            "cost": 1418,
            "discount": 415,
            "self-closing": true
        },
        {
            "item_id": 419,
            "invoice_id": 376,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 31,
            "cost": 293,
            "discount": 556,
            "self-closing": true
        },
        {
            "item_id": 420,
            "invoice_id": 45,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 70,
            "cost": 399,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 421,
            "invoice_id": 329,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 47,
            "cost": 69,
            "discount": 737,
            "self-closing": true
        },
        {
            "item_id": 422,
            "invoice_id": 201,
            "invoice_item_number": 3,
            "product_id": 28,
            "quantity": 26,
            "cost": 1449,
            "discount": 83,
            "self-closing": true
        },
        {
            "item_id": 423,
            "invoice_id": 324,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 32,
            "cost": 1415,
            "discount": 667,
            "self-closing": true
        },
        {
            "item_id": 424,
            "invoice_id": 87,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 96,
            "cost": 1176,
            "discount": 455,
            "self-closing": true
        },
        {
            "item_id": 425,
            "invoice_id": 63,
            "invoice_item_number": 4,
            "product_id": 29,
            "quantity": 25,
            "cost": 563,
            "discount": 803,
            "self-closing": true
        },
        {
            "item_id": 426,
            "invoice_id": 37,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 19,
            "cost": 245,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 427,
            "invoice_id": 29,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 47,
            "cost": 1316,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 428,
            "invoice_id": 45,
            "invoice_item_number": 4,
            "product_id": 25,
            "quantity": 34,
            "cost": 450,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 429,
            "invoice_id": 45,
            "invoice_item_number": 8,
            "product_id": 17,
            "quantity": 45,
            "cost": 1800,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 430,
            "invoice_id": 350,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 51,
            "cost": 1164,
            "discount": 754,
            "self-closing": true
        },
        {
            "item_id": 431,
            "invoice_id": 144,
            "invoice_item_number": 1,
            "product_id": 14,
            "quantity": 95,
            "cost": 146,
            "discount": 911,
            "self-closing": true
        },
        {
            "item_id": 432,
            "invoice_id": 46,
            "invoice_item_number": 1,
            "product_id": 29,
            "quantity": 46,
            "cost": 1000,
            "discount": 39,
            "self-closing": true
        },
        {
            "item_id": 433,
            "invoice_id": 99,
            "invoice_item_number": 8,
            "product_id": 29,
            "quantity": 25,
            "cost": 356,
            "discount": 200,
            "self-closing": true
        },
        {
            "item_id": 434,
            "invoice_id": 330,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 79,
            "cost": 499,
            "discount": 598,
            "self-closing": true
        },
        {
            "item_id": 435,
            "invoice_id": 194,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 90,
            "cost": 1325,
            "discount": 712,
            "self-closing": true
        },
        {
            "item_id": 436,
            "invoice_id": 197,
            "invoice_item_number": 1,
            "product_id": 29,
            "quantity": 22,
            "cost": 1373,
            "discount": 844,
            "self-closing": true
        },
        {
            "item_id": 437,
            "invoice_id": 378,
            "invoice_item_number": 2,
            "product_id": 26,
            "quantity": 65,
            "cost": 119,
            "discount": 250,
            "self-closing": true
        },
        {
            "item_id": 438,
            "invoice_id": 31,
            "invoice_item_number": 8,
            "product_id": 22,
            "quantity": 46,
            "cost": 99,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 439,
            "invoice_id": 261,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 76,
            "cost": 1037,
            "discount": 989,
            "self-closing": true
        },
        {
            "item_id": 440,
            "invoice_id": 107,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 56,
            "cost": 223,
            "discount": 640,
            "self-closing": true
        },
        {
            "item_id": 441,
            "invoice_id": 68,
            "invoice_item_number": 7,
            "product_id": 22,
            "quantity": 35,
            "cost": 1276,
            "discount": 179,
            "self-closing": true
        },
        {
            "item_id": 442,
            "invoice_id": 342,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 71,
            "cost": 1158,
            "discount": 515,
            "self-closing": true
        },
        {
            "item_id": 443,
            "invoice_id": 327,
            "invoice_item_number": 4,
            "product_id": 2,
            "quantity": 58,
            "cost": 898,
            "discount": 502,
            "self-closing": true
        },
        {
            "item_id": 444,
            "invoice_id": 214,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 78,
            "cost": 37,
            "discount": 159,
            "self-closing": true
        },
        {
            "item_id": 445,
            "invoice_id": 33,
            "invoice_item_number": 8,
            "product_id": 22,
            "quantity": 69,
            "cost": 557,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 446,
            "invoice_id": 19,
            "invoice_item_number": 7,
            "product_id": 6,
            "quantity": 33,
            "cost": 481,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 447,
            "invoice_id": 228,
            "invoice_item_number": 6,
            "product_id": 12,
            "quantity": 99,
            "cost": 1466,
            "discount": 212,
            "self-closing": true
        },
        {
            "item_id": 448,
            "invoice_id": 4,
            "invoice_item_number": 1,
            "product_id": 6,
            "quantity": 91,
            "cost": 260,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 449,
            "invoice_id": 279,
            "invoice_item_number": 8,
            "product_id": 6,
            "quantity": 14,
            "cost": 509,
            "discount": 719,
            "self-closing": true
        },
        {
            "item_id": 450,
            "invoice_id": 293,
            "invoice_item_number": 2,
            "product_id": 25,
            "quantity": 64,
            "cost": 101,
            "discount": 383,
            "self-closing": true
        },
        {
            "item_id": 451,
            "invoice_id": 168,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 51,
            "cost": 1363,
            "discount": 470,
            "self-closing": true
        },
        {
            "item_id": 452,
            "invoice_id": 223,
            "invoice_item_number": 6,
            "product_id": 24,
            "quantity": 91,
            "cost": 1256,
            "discount": 92,
            "self-closing": true
        },
        {
            "item_id": 453,
            "invoice_id": 129,
            "invoice_item_number": 5,
            "product_id": 24,
            "quantity": 15,
            "cost": 758,
            "discount": 658,
            "self-closing": true
        },
        {
            "item_id": 454,
            "invoice_id": 199,
            "invoice_item_number": 8,
            "product_id": 9,
            "quantity": 98,
            "cost": 784,
            "discount": 958,
            "self-closing": true
        },
        {
            "item_id": 455,
            "invoice_id": 308,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 83,
            "cost": 893,
            "discount": 383,
            "self-closing": true
        },
        {
            "item_id": 456,
            "invoice_id": 226,
            "invoice_item_number": 5,
            "product_id": 20,
            "quantity": 17,
            "cost": 1183,
            "discount": 666,
            "self-closing": true
        },
        {
            "item_id": 457,
            "invoice_id": 339,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 89,
            "cost": 60,
            "discount": 494,
            "self-closing": true
        },
        {
            "item_id": 458,
            "invoice_id": 223,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 48,
            "cost": 496,
            "discount": 765,
            "self-closing": true
        },
        {
            "item_id": 459,
            "invoice_id": 322,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 84,
            "cost": 489,
            "discount": 588,
            "self-closing": true
        },
        {
            "item_id": 460,
            "invoice_id": 400,
            "invoice_item_number": 9,
            "product_id": 14,
            "quantity": 81,
            "cost": 784,
            "discount": 15,
            "self-closing": true
        },
        {
            "item_id": 461,
            "invoice_id": 263,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 82,
            "cost": 837,
            "discount": 969,
            "self-closing": true
        },
        {
            "item_id": 462,
            "invoice_id": 348,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 43,
            "cost": 623,
            "discount": 891,
            "self-closing": true
        },
        {
            "item_id": 463,
            "invoice_id": 38,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 99,
            "cost": 348,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 464,
            "invoice_id": 336,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 10,
            "cost": 963,
            "discount": 79,
            "self-closing": true
        },
        {
            "item_id": 465,
            "invoice_id": 67,
            "invoice_item_number": 8,
            "product_id": 2,
            "quantity": 71,
            "cost": 1293,
            "discount": 996,
            "self-closing": true
        },
        {
            "item_id": 466,
            "invoice_id": 361,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 86,
            "cost": 511,
            "discount": 874,
            "self-closing": true
        },
        {
            "item_id": 467,
            "invoice_id": 331,
            "invoice_item_number": 4,
            "product_id": 18,
            "quantity": 11,
            "cost": 867,
            "discount": 286,
            "self-closing": true
        },
        {
            "item_id": 468,
            "invoice_id": 52,
            "invoice_item_number": 7,
            "product_id": 7,
            "quantity": 84,
            "cost": 87,
            "discount": 817,
            "self-closing": true
        },
        {
            "item_id": 469,
            "invoice_id": 325,
            "invoice_item_number": 2,
            "product_id": 25,
            "quantity": 58,
            "cost": 1360,
            "discount": 315,
            "self-closing": true
        },
        {
            "item_id": 470,
            "invoice_id": 394,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 29,
            "cost": 151,
            "discount": 775,
            "self-closing": true
        },
        {
            "item_id": 471,
            "invoice_id": 125,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 25,
            "cost": 1399,
            "discount": 147,
            "self-closing": true
        },
        {
            "item_id": 472,
            "invoice_id": 259,
            "invoice_item_number": 6,
            "product_id": 12,
            "quantity": 82,
            "cost": 900,
            "discount": 222,
            "self-closing": true
        },
        {
            "item_id": 473,
            "invoice_id": 181,
            "invoice_item_number": 3,
            "product_id": 25,
            "quantity": 59,
            "cost": 721,
            "discount": 434,
            "self-closing": true
        },
        {
            "item_id": 474,
            "invoice_id": 117,
            "invoice_item_number": 2,
            "product_id": 18,
            "quantity": 38,
            "cost": 916,
            "discount": 670,
            "self-closing": true
        },
        {
            "item_id": 475,
            "invoice_id": 45,
            "invoice_item_number": 6,
            "product_id": 29,
            "quantity": 120,
            "cost": 13450,
            "discount": 2300,
            "self-closing": true
        },
        {
            "item_id": 476,
            "invoice_id": 343,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 26,
            "cost": 289,
            "discount": 180,
            "self-closing": true
        },
        {
            "item_id": 477,
            "invoice_id": 18,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 11,
            "cost": 1169,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 478,
            "invoice_id": 120,
            "invoice_item_number": 8,
            "product_id": 16,
            "quantity": 26,
            "cost": 45,
            "discount": 589,
            "self-closing": true
        },
        {
            "item_id": 479,
            "invoice_id": 339,
            "invoice_item_number": 4,
            "product_id": 18,
            "quantity": 58,
            "cost": 710,
            "discount": 212,
            "self-closing": true
        },
        {
            "item_id": 480,
            "invoice_id": 169,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 28,
            "cost": 445,
            "discount": 258,
            "self-closing": true
        },
        {
            "item_id": 481,
            "invoice_id": 348,
            "invoice_item_number": 4,
            "product_id": 3,
            "quantity": 84,
            "cost": 275,
            "discount": 319,
            "self-closing": true
        },
        {
            "item_id": 482,
            "invoice_id": 357,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 80,
            "cost": 272,
            "discount": 541,
            "self-closing": true
        },
        {
            "item_id": 483,
            "invoice_id": 45,
            "invoice_item_number": 9,
            "product_id": 18,
            "quantity": 77,
            "cost": 56,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 484,
            "invoice_id": 184,
            "invoice_item_number": 5,
            "product_id": 13,
            "quantity": 65,
            "cost": 605,
            "discount": 490,
            "self-closing": true
        },
        {
            "item_id": 485,
            "invoice_id": 46,
            "invoice_item_number": 2,
            "product_id": 24,
            "quantity": 38,
            "cost": 1650,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 486,
            "invoice_id": 27,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 68,
            "cost": 592,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 487,
            "invoice_id": 123,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 27,
            "cost": 853,
            "discount": 169,
            "self-closing": true
        },
        {
            "item_id": 488,
            "invoice_id": 46,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 63,
            "cost": 940,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 489,
            "invoice_id": 319,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 12,
            "cost": 1445,
            "discount": 423,
            "self-closing": true
        },
        {
            "item_id": 490,
            "invoice_id": 150,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 17,
            "cost": 482,
            "discount": 885,
            "self-closing": true
        },
        {
            "item_id": 491,
            "invoice_id": 337,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 47,
            "cost": 757,
            "discount": 393,
            "self-closing": true
        },
        {
            "item_id": 492,
            "invoice_id": 247,
            "invoice_item_number": 6,
            "product_id": 28,
            "quantity": 11,
            "cost": 696,
            "discount": 597,
            "self-closing": true
        },
        {
            "item_id": 493,
            "invoice_id": 320,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 83,
            "cost": 575,
            "discount": 291,
            "self-closing": true
        },
        {
            "item_id": 494,
            "invoice_id": 341,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 23,
            "cost": 698,
            "discount": 182,
            "self-closing": true
        },
        {
            "item_id": 495,
            "invoice_id": 25,
            "invoice_item_number": 3,
            "product_id": 23,
            "quantity": 28,
            "cost": 222,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 496,
            "invoice_id": 248,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 57,
            "cost": 1061,
            "discount": 852,
            "self-closing": true
        },
        {
            "item_id": 497,
            "invoice_id": 353,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 48,
            "cost": 215,
            "discount": 536,
            "self-closing": true
        },
        {
            "item_id": 498,
            "invoice_id": 242,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 52,
            "cost": 443,
            "discount": 768,
            "self-closing": true
        },
        {
            "item_id": 499,
            "invoice_id": 388,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 90,
            "cost": 1301,
            "discount": 85,
            "self-closing": true
        },
        {
            "item_id": 500,
            "invoice_id": 215,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 66,
            "cost": 543,
            "discount": 722,
            "self-closing": true
        },
        {
            "item_id": 501,
            "invoice_id": 241,
            "invoice_item_number": 8,
            "product_id": 30,
            "quantity": 78,
            "cost": 179,
            "discount": 998,
            "self-closing": true
        },
        {
            "item_id": 502,
            "invoice_id": 215,
            "invoice_item_number": 8,
            "product_id": 4,
            "quantity": 46,
            "cost": 493,
            "discount": 491,
            "self-closing": true
        },
        {
            "item_id": 503,
            "invoice_id": 304,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 38,
            "cost": 1381,
            "discount": 470,
            "self-closing": true
        },
        {
            "item_id": 504,
            "invoice_id": 349,
            "invoice_item_number": 1,
            "product_id": 13,
            "quantity": 22,
            "cost": 823,
            "discount": 759,
            "self-closing": true
        },
        {
            "item_id": 505,
            "invoice_id": 287,
            "invoice_item_number": 3,
            "product_id": 6,
            "quantity": 80,
            "cost": 708,
            "discount": 489,
            "self-closing": true
        },
        {
            "item_id": 506,
            "invoice_id": 215,
            "invoice_item_number": 9,
            "product_id": 5,
            "quantity": 43,
            "cost": 201,
            "discount": 507,
            "self-closing": true
        },
        {
            "item_id": 507,
            "invoice_id": 320,
            "invoice_item_number": 6,
            "product_id": 12,
            "quantity": 78,
            "cost": 1477,
            "discount": 907,
            "self-closing": true
        },
        {
            "item_id": 508,
            "invoice_id": 48,
            "invoice_item_number": 1,
            "product_id": 12,
            "quantity": 55,
            "cost": 1064,
            "discount": 315,
            "self-closing": true
        },
        {
            "item_id": 509,
            "invoice_id": 311,
            "invoice_item_number": 9,
            "product_id": 4,
            "quantity": 74,
            "cost": 1430,
            "discount": 324,
            "self-closing": true
        },
        {
            "item_id": 510,
            "invoice_id": 195,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 61,
            "cost": 1358,
            "discount": 74,
            "self-closing": true
        },
        {
            "item_id": 511,
            "invoice_id": 216,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 37,
            "cost": 565,
            "discount": 657,
            "self-closing": true
        },
        {
            "item_id": 512,
            "invoice_id": 315,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 74,
            "cost": 236,
            "discount": 249,
            "self-closing": true
        },
        {
            "item_id": 513,
            "invoice_id": 17,
            "invoice_item_number": 1,
            "product_id": 27,
            "quantity": 73,
            "cost": 1232,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 514,
            "invoice_id": 322,
            "invoice_item_number": 1,
            "product_id": 27,
            "quantity": 70,
            "cost": 361,
            "discount": 935,
            "self-closing": true
        },
        {
            "item_id": 515,
            "invoice_id": 175,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 42,
            "cost": 746,
            "discount": 795,
            "self-closing": true
        },
        {
            "item_id": 516,
            "invoice_id": 46,
            "invoice_item_number": 4,
            "product_id": 1,
            "quantity": 16,
            "cost": 890,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 517,
            "invoice_id": 227,
            "invoice_item_number": 5,
            "product_id": 21,
            "quantity": 35,
            "cost": 120,
            "discount": 255,
            "self-closing": true
        },
        {
            "item_id": 518,
            "invoice_id": 232,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 72,
            "cost": 762,
            "discount": 986,
            "self-closing": true
        },
        {
            "item_id": 519,
            "invoice_id": 111,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 94,
            "cost": 335,
            "discount": 306,
            "self-closing": true
        },
        {
            "item_id": 520,
            "invoice_id": 67,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 63,
            "cost": 673,
            "discount": 359,
            "self-closing": true
        },
        {
            "item_id": 521,
            "invoice_id": 143,
            "invoice_item_number": 1,
            "product_id": 18,
            "quantity": 30,
            "cost": 160,
            "discount": 602,
            "self-closing": true
        },
        {
            "item_id": 522,
            "invoice_id": 389,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 70,
            "cost": 1375,
            "discount": 265,
            "self-closing": true
        },
        {
            "item_id": 523,
            "invoice_id": 8,
            "invoice_item_number": 1,
            "product_id": 21,
            "quantity": 20,
            "cost": 199,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 524,
            "invoice_id": 94,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 31,
            "cost": 1132,
            "discount": 776,
            "self-closing": true
        },
        {
            "item_id": 525,
            "invoice_id": 323,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 76,
            "cost": 561,
            "discount": 342,
            "self-closing": true
        },
        {
            "item_id": 526,
            "invoice_id": 85,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 44,
            "cost": 595,
            "discount": 431,
            "self-closing": true
        },
        {
            "item_id": 527,
            "invoice_id": 88,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 13,
            "cost": 245,
            "discount": 165,
            "self-closing": true
        },
        {
            "item_id": 528,
            "invoice_id": 210,
            "invoice_item_number": 9,
            "product_id": 29,
            "quantity": 33,
            "cost": 142,
            "discount": 793,
            "self-closing": true
        },
        {
            "item_id": 529,
            "invoice_id": 46,
            "invoice_item_number": 5,
            "product_id": 7,
            "quantity": 123,
            "cost": 859,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 530,
            "invoice_id": 341,
            "invoice_item_number": 7,
            "product_id": 6,
            "quantity": 82,
            "cost": 1459,
            "discount": 871,
            "self-closing": true
        },
        {
            "item_id": 531,
            "invoice_id": 46,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 93,
            "cost": 594,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 532,
            "invoice_id": 381,
            "invoice_item_number": 3,
            "product_id": 19,
            "quantity": 78,
            "cost": 1255,
            "discount": 54,
            "self-closing": true
        },
        {
            "item_id": 533,
            "invoice_id": 398,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 50,
            "cost": 224,
            "discount": 671,
            "self-closing": true
        },
        {
            "item_id": 534,
            "invoice_id": 195,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 11,
            "cost": 1116,
            "discount": 548,
            "self-closing": true
        },
        {
            "item_id": 535,
            "invoice_id": 224,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 55,
            "cost": 780,
            "discount": 817,
            "self-closing": true
        },
        {
            "item_id": 536,
            "invoice_id": 325,
            "invoice_item_number": 3,
            "product_id": 2,
            "quantity": 31,
            "cost": 520,
            "discount": 794,
            "self-closing": true
        },
        {
            "item_id": 537,
            "invoice_id": 251,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 30,
            "cost": 466,
            "discount": 155,
            "self-closing": true
        },
        {
            "item_id": 538,
            "invoice_id": 225,
            "invoice_item_number": 1,
            "product_id": 27,
            "quantity": 18,
            "cost": 1368,
            "discount": 99,
            "self-closing": true
        },
        {
            "item_id": 539,
            "invoice_id": 86,
            "invoice_item_number": 7,
            "product_id": 21,
            "quantity": 59,
            "cost": 388,
            "discount": 81,
            "self-closing": true
        },
        {
            "item_id": 540,
            "invoice_id": 394,
            "invoice_item_number": 9,
            "product_id": 11,
            "quantity": 28,
            "cost": 1222,
            "discount": 510,
            "self-closing": true
        },
        {
            "item_id": 541,
            "invoice_id": 322,
            "invoice_item_number": 4,
            "product_id": 3,
            "quantity": 21,
            "cost": 1491,
            "discount": 480,
            "self-closing": true
        },
        {
            "item_id": 542,
            "invoice_id": 122,
            "invoice_item_number": 3,
            "product_id": 27,
            "quantity": 21,
            "cost": 1179,
            "discount": 634,
            "self-closing": true
        },
        {
            "item_id": 543,
            "invoice_id": 303,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 58,
            "cost": 1371,
            "discount": 790,
            "self-closing": true
        },
        {
            "item_id": 544,
            "invoice_id": 50,
            "invoice_item_number": 3,
            "product_id": 6,
            "quantity": 89,
            "cost": 485,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 545,
            "invoice_id": 198,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 46,
            "cost": 408,
            "discount": 738,
            "self-closing": true
        },
        {
            "item_id": 546,
            "invoice_id": 238,
            "invoice_item_number": 6,
            "product_id": 19,
            "quantity": 89,
            "cost": 466,
            "discount": 183,
            "self-closing": true
        },
        {
            "item_id": 547,
            "invoice_id": 130,
            "invoice_item_number": 5,
            "product_id": 11,
            "quantity": 82,
            "cost": 983,
            "discount": 763,
            "self-closing": true
        },
        {
            "item_id": 548,
            "invoice_id": 208,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 59,
            "cost": 236,
            "discount": 645,
            "self-closing": true
        },
        {
            "item_id": 549,
            "invoice_id": 4,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 52,
            "cost": 1366,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 550,
            "invoice_id": 111,
            "invoice_item_number": 6,
            "product_id": 9,
            "quantity": 29,
            "cost": 1163,
            "discount": 574,
            "self-closing": true
        },
        {
            "item_id": 551,
            "invoice_id": 242,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 62,
            "cost": 252,
            "discount": 634,
            "self-closing": true
        },
        {
            "item_id": 552,
            "invoice_id": 46,
            "invoice_item_number": 6,
            "product_id": 12,
            "quantity": 38,
            "cost": 940,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 553,
            "invoice_id": 355,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 95,
            "cost": 141,
            "discount": 254,
            "self-closing": true
        },
        {
            "item_id": 554,
            "invoice_id": 58,
            "invoice_item_number": 7,
            "product_id": 28,
            "quantity": 100,
            "cost": 1265,
            "discount": 574,
            "self-closing": true
        },
        {
            "item_id": 555,
            "invoice_id": 201,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 99,
            "cost": 1188,
            "discount": 168,
            "self-closing": true
        },
        {
            "item_id": 556,
            "invoice_id": 301,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 80,
            "cost": 367,
            "discount": 433,
            "self-closing": true
        },
        {
            "item_id": 557,
            "invoice_id": 131,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 17,
            "cost": 1304,
            "discount": 929,
            "self-closing": true
        },
        {
            "item_id": 558,
            "invoice_id": 34,
            "invoice_item_number": 5,
            "product_id": 2,
            "quantity": 13,
            "cost": 1393,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 559,
            "invoice_id": 328,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 18,
            "cost": 759,
            "discount": 58,
            "self-closing": true
        },
        {
            "item_id": 560,
            "invoice_id": 21,
            "invoice_item_number": 1,
            "product_id": 19,
            "quantity": 41,
            "cost": 833,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 561,
            "invoice_id": 46,
            "invoice_item_number": 8,
            "product_id": 2,
            "quantity": 139,
            "cost": 903,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 562,
            "invoice_id": 87,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 37,
            "cost": 430,
            "discount": 831,
            "self-closing": true
        },
        {
            "item_id": 563,
            "invoice_id": 47,
            "invoice_item_number": 1,
            "product_id": 3,
            "quantity": 26,
            "cost": 940,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 564,
            "invoice_id": 35,
            "invoice_item_number": 5,
            "product_id": 24,
            "quantity": 11,
            "cost": 933,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 565,
            "invoice_id": 248,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 23,
            "cost": 502,
            "discount": 816,
            "self-closing": true
        },
        {
            "item_id": 566,
            "invoice_id": 261,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 53,
            "cost": 1354,
            "discount": 920,
            "self-closing": true
        },
        {
            "item_id": 567,
            "invoice_id": 47,
            "invoice_item_number": 2,
            "product_id": 19,
            "quantity": 156,
            "cost": 384,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 568,
            "invoice_id": 95,
            "invoice_item_number": 9,
            "product_id": 4,
            "quantity": 11,
            "cost": 1019,
            "discount": 126,
            "self-closing": true
        },
        {
            "item_id": 569,
            "invoice_id": 261,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 83,
            "cost": 848,
            "discount": 694,
            "self-closing": true
        },
        {
            "item_id": 570,
            "invoice_id": 172,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 25,
            "cost": 735,
            "discount": 112,
            "self-closing": true
        },
        {
            "item_id": 571,
            "invoice_id": 27,
            "invoice_item_number": 7,
            "product_id": 27,
            "quantity": 65,
            "cost": 719,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 572,
            "invoice_id": 309,
            "invoice_item_number": 7,
            "product_id": 9,
            "quantity": 30,
            "cost": 1174,
            "discount": 345,
            "self-closing": true
        },
        {
            "item_id": 573,
            "invoice_id": 47,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 47,
            "cost": 890,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 574,
            "invoice_id": 358,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 66,
            "cost": 203,
            "discount": 370,
            "self-closing": true
        },
        {
            "item_id": 575,
            "invoice_id": 279,
            "invoice_item_number": 6,
            "product_id": 9,
            "quantity": 33,
            "cost": 313,
            "discount": 597,
            "self-closing": true
        },
        {
            "item_id": 576,
            "invoice_id": 99,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 37,
            "cost": 641,
            "discount": 664,
            "self-closing": true
        },
        {
            "item_id": 577,
            "invoice_id": 95,
            "invoice_item_number": 9,
            "product_id": 15,
            "quantity": 17,
            "cost": 987,
            "discount": 119,
            "self-closing": true
        },
        {
            "item_id": 578,
            "invoice_id": 358,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 93,
            "cost": 652,
            "discount": 163,
            "self-closing": true
        },
        {
            "item_id": 579,
            "invoice_id": 398,
            "invoice_item_number": 7,
            "product_id": 23,
            "quantity": 38,
            "cost": 824,
            "discount": 563,
            "self-closing": true
        },
        {
            "item_id": 580,
            "invoice_id": 72,
            "invoice_item_number": 7,
            "product_id": 16,
            "quantity": 47,
            "cost": 162,
            "discount": 89,
            "self-closing": true
        },
        {
            "item_id": 581,
            "invoice_id": 218,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 26,
            "cost": 832,
            "discount": 176,
            "self-closing": true
        },
        {
            "item_id": 582,
            "invoice_id": 255,
            "invoice_item_number": 9,
            "product_id": 11,
            "quantity": 73,
            "cost": 297,
            "discount": 200,
            "self-closing": true
        },
        {
            "item_id": 583,
            "invoice_id": 226,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 55,
            "cost": 747,
            "discount": 733,
            "self-closing": true
        },
        {
            "item_id": 584,
            "invoice_id": 391,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 81,
            "cost": 1003,
            "discount": 920,
            "self-closing": true
        },
        {
            "item_id": 585,
            "invoice_id": 134,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 43,
            "cost": 818,
            "discount": 582,
            "self-closing": true
        },
        {
            "item_id": 586,
            "invoice_id": 125,
            "invoice_item_number": 1,
            "product_id": 7,
            "quantity": 85,
            "cost": 1217,
            "discount": 848,
            "self-closing": true
        },
        {
            "item_id": 587,
            "invoice_id": 337,
            "invoice_item_number": 2,
            "product_id": 20,
            "quantity": 52,
            "cost": 115,
            "discount": 819,
            "self-closing": true
        },
        {
            "item_id": 588,
            "invoice_id": 399,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 88,
            "cost": 75,
            "discount": 602,
            "self-closing": true
        },
        {
            "item_id": 589,
            "invoice_id": 324,
            "invoice_item_number": 9,
            "product_id": 18,
            "quantity": 52,
            "cost": 1068,
            "discount": 643,
            "self-closing": true
        },
        {
            "item_id": 590,
            "invoice_id": 387,
            "invoice_item_number": 9,
            "product_id": 21,
            "quantity": 12,
            "cost": 1309,
            "discount": 646,
            "self-closing": true
        },
        {
            "item_id": 591,
            "invoice_id": 369,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 41,
            "cost": 1139,
            "discount": 394,
            "self-closing": true
        },
        {
            "item_id": 592,
            "invoice_id": 47,
            "invoice_item_number": 4,
            "product_id": 29,
            "quantity": 165,
            "cost": 844,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 593,
            "invoice_id": 374,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 33,
            "cost": 1396,
            "discount": 90,
            "self-closing": true
        },
        {
            "item_id": 594,
            "invoice_id": 257,
            "invoice_item_number": 5,
            "product_id": 13,
            "quantity": 99,
            "cost": 1224,
            "discount": 135,
            "self-closing": true
        },
        {
            "item_id": 595,
            "invoice_id": 368,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 43,
            "cost": 1349,
            "discount": 869,
            "self-closing": true
        },
        {
            "item_id": 596,
            "invoice_id": 142,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 40,
            "cost": 780,
            "discount": 495,
            "self-closing": true
        },
        {
            "item_id": 597,
            "invoice_id": 52,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 23,
            "cost": 1272,
            "discount": 842,
            "self-closing": true
        },
        {
            "item_id": 598,
            "invoice_id": 257,
            "invoice_item_number": 6,
            "product_id": 17,
            "quantity": 14,
            "cost": 1053,
            "discount": 422,
            "self-closing": true
        },
        {
            "item_id": 599,
            "invoice_id": 237,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 30,
            "cost": 809,
            "discount": 492,
            "self-closing": true
        },
        {
            "item_id": 600,
            "invoice_id": 395,
            "invoice_item_number": 2,
            "product_id": 26,
            "quantity": 79,
            "cost": 627,
            "discount": 251,
            "self-closing": true
        },
        {
            "item_id": 601,
            "invoice_id": 280,
            "invoice_item_number": 2,
            "product_id": 28,
            "quantity": 27,
            "cost": 1119,
            "discount": 785,
            "self-closing": true
        },
        {
            "item_id": 602,
            "invoice_id": 182,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 58,
            "cost": 234,
            "discount": 103,
            "self-closing": true
        },
        {
            "item_id": 603,
            "invoice_id": 47,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 18,
            "cost": 447,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 604,
            "invoice_id": 334,
            "invoice_item_number": 6,
            "product_id": 25,
            "quantity": 93,
            "cost": 1444,
            "discount": 679,
            "self-closing": true
        },
        {
            "item_id": 605,
            "invoice_id": 19,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 70,
            "cost": 237,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 606,
            "invoice_id": 261,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 40,
            "cost": 1036,
            "discount": 614,
            "self-closing": true
        },
        {
            "item_id": 607,
            "invoice_id": 258,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 62,
            "cost": 1475,
            "discount": 353,
            "self-closing": true
        },
        {
            "item_id": 608,
            "invoice_id": 321,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 71,
            "cost": 353,
            "discount": 772,
            "self-closing": true
        },
        {
            "item_id": 609,
            "invoice_id": 47,
            "invoice_item_number": 6,
            "product_id": 15,
            "quantity": 1,
            "cost": 478,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 610,
            "invoice_id": 185,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 80,
            "cost": 233,
            "discount": 718,
            "self-closing": true
        },
        {
            "item_id": 611,
            "invoice_id": 273,
            "invoice_item_number": 6,
            "product_id": 22,
            "quantity": 14,
            "cost": 1243,
            "discount": 951,
            "self-closing": true
        },
        {
            "item_id": 612,
            "invoice_id": 370,
            "invoice_item_number": 5,
            "product_id": 20,
            "quantity": 58,
            "cost": 1320,
            "discount": 271,
            "self-closing": true
        },
        {
            "item_id": 613,
            "invoice_id": 118,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 90,
            "cost": 158,
            "discount": 146,
            "self-closing": true
        },
        {
            "item_id": 614,
            "invoice_id": 269,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 21,
            "cost": 118,
            "discount": 751,
            "self-closing": true
        },
        {
            "item_id": 615,
            "invoice_id": 200,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 56,
            "cost": 425,
            "discount": 951,
            "self-closing": true
        },
        {
            "item_id": 616,
            "invoice_id": 125,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 75,
            "cost": 1440,
            "discount": 529,
            "self-closing": true
        },
        {
            "item_id": 617,
            "invoice_id": 47,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 100,
            "cost": 782,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 618,
            "invoice_id": 90,
            "invoice_item_number": 4,
            "product_id": 3,
            "quantity": 99,
            "cost": 200,
            "discount": 73,
            "self-closing": true
        },
        {
            "item_id": 619,
            "invoice_id": 139,
            "invoice_item_number": 7,
            "product_id": 23,
            "quantity": 33,
            "cost": 709,
            "discount": 441,
            "self-closing": true
        },
        {
            "item_id": 620,
            "invoice_id": 31,
            "invoice_item_number": 8,
            "product_id": 15,
            "quantity": 55,
            "cost": 759,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 621,
            "invoice_id": 255,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 83,
            "cost": 226,
            "discount": 27,
            "self-closing": true
        },
        {
            "item_id": 622,
            "invoice_id": 64,
            "invoice_item_number": 1,
            "product_id": 12,
            "quantity": 13,
            "cost": 1220,
            "discount": 69,
            "self-closing": true
        },
        {
            "item_id": 623,
            "invoice_id": 321,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 30,
            "cost": 521,
            "discount": 836,
            "self-closing": true
        },
        {
            "item_id": 624,
            "invoice_id": 274,
            "invoice_item_number": 2,
            "product_id": 25,
            "quantity": 88,
            "cost": 1008,
            "discount": 365,
            "self-closing": true
        },
        {
            "item_id": 625,
            "invoice_id": 270,
            "invoice_item_number": 5,
            "product_id": 20,
            "quantity": 23,
            "cost": 1417,
            "discount": 470,
            "self-closing": true
        },
        {
            "item_id": 626,
            "invoice_id": 311,
            "invoice_item_number": 7,
            "product_id": 21,
            "quantity": 58,
            "cost": 276,
            "discount": 711,
            "self-closing": true
        },
        {
            "item_id": 627,
            "invoice_id": 300,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 57,
            "cost": 905,
            "discount": 723,
            "self-closing": true
        },
        {
            "item_id": 628,
            "invoice_id": 26,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 36,
            "cost": 297,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 629,
            "invoice_id": 186,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 83,
            "cost": 1145,
            "discount": 507,
            "self-closing": true
        },
        {
            "item_id": 630,
            "invoice_id": 47,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 20,
            "cost": 1123,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 631,
            "invoice_id": 273,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 55,
            "cost": 801,
            "discount": 169,
            "self-closing": true
        },
        {
            "item_id": 632,
            "invoice_id": 320,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 38,
            "cost": 1016,
            "discount": 415,
            "self-closing": true
        },
        {
            "item_id": 633,
            "invoice_id": 233,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 18,
            "cost": 326,
            "discount": 38,
            "self-closing": true
        },
        {
            "item_id": 634,
            "invoice_id": 141,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 62,
            "cost": 359,
            "discount": 39,
            "self-closing": true
        },
        {
            "item_id": 635,
            "invoice_id": 271,
            "invoice_item_number": 8,
            "product_id": 7,
            "quantity": 47,
            "cost": 840,
            "discount": 982,
            "self-closing": true
        },
        {
            "item_id": 636,
            "invoice_id": 173,
            "invoice_item_number": 5,
            "product_id": 28,
            "quantity": 41,
            "cost": 1104,
            "discount": 149,
            "self-closing": true
        },
        {
            "item_id": 637,
            "invoice_id": 237,
            "invoice_item_number": 3,
            "product_id": 15,
            "quantity": 43,
            "cost": 302,
            "discount": 629,
            "self-closing": true
        },
        {
            "item_id": 638,
            "invoice_id": 383,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 60,
            "cost": 1270,
            "discount": 14,
            "self-closing": true
        },
        {
            "item_id": 639,
            "invoice_id": 273,
            "invoice_item_number": 9,
            "product_id": 13,
            "quantity": 88,
            "cost": 1122,
            "discount": 617,
            "self-closing": true
        },
        {
            "item_id": 640,
            "invoice_id": 301,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 31,
            "cost": 392,
            "discount": 475,
            "self-closing": true
        },
        {
            "item_id": 641,
            "invoice_id": 152,
            "invoice_item_number": 7,
            "product_id": 12,
            "quantity": 55,
            "cost": 1286,
            "discount": 729,
            "self-closing": true
        },
        {
            "item_id": 642,
            "invoice_id": 121,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 60,
            "cost": 957,
            "discount": 671,
            "self-closing": true
        },
        {
            "item_id": 643,
            "invoice_id": 391,
            "invoice_item_number": 6,
            "product_id": 7,
            "quantity": 14,
            "cost": 1368,
            "discount": 989,
            "self-closing": true
        },
        {
            "item_id": 644,
            "invoice_id": 349,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 44,
            "cost": 754,
            "discount": 981,
            "self-closing": true
        },
        {
            "item_id": 645,
            "invoice_id": 361,
            "invoice_item_number": 9,
            "product_id": 14,
            "quantity": 21,
            "cost": 457,
            "discount": 851,
            "self-closing": true
        },
        {
            "item_id": 646,
            "invoice_id": 229,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 39,
            "cost": 148,
            "discount": 270,
            "self-closing": true
        },
        {
            "item_id": 647,
            "invoice_id": 101,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 26,
            "cost": 251,
            "discount": 819,
            "self-closing": true
        },
        {
            "item_id": 648,
            "invoice_id": 28,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 99,
            "cost": 209,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 649,
            "invoice_id": 118,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 10,
            "cost": 932,
            "discount": 578,
            "self-closing": true
        },
        {
            "item_id": 650,
            "invoice_id": 48,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 32,
            "cost": 1000,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 651,
            "invoice_id": 326,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 14,
            "cost": 170,
            "discount": 90,
            "self-closing": true
        },
        {
            "item_id": 652,
            "invoice_id": 75,
            "invoice_item_number": 1,
            "product_id": 30,
            "quantity": 34,
            "cost": 1350,
            "discount": 67,
            "self-closing": true
        },
        {
            "item_id": 653,
            "invoice_id": 314,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 57,
            "cost": 654,
            "discount": 572,
            "self-closing": true
        },
        {
            "item_id": 654,
            "invoice_id": 134,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 39,
            "cost": 52,
            "discount": 732,
            "self-closing": true
        },
        {
            "item_id": 655,
            "invoice_id": 236,
            "invoice_item_number": 9,
            "product_id": 26,
            "quantity": 64,
            "cost": 79,
            "discount": 600,
            "self-closing": true
        },
        {
            "item_id": 656,
            "invoice_id": 307,
            "invoice_item_number": 6,
            "product_id": 14,
            "quantity": 84,
            "cost": 987,
            "discount": 460,
            "self-closing": true
        },
        {
            "item_id": 657,
            "invoice_id": 73,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 78,
            "cost": 219,
            "discount": 948,
            "self-closing": true
        },
        {
            "item_id": 658,
            "invoice_id": 7,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 19,
            "cost": 1208,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 659,
            "invoice_id": 201,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 51,
            "cost": 669,
            "discount": 735,
            "self-closing": true
        },
        {
            "item_id": 660,
            "invoice_id": 256,
            "invoice_item_number": 8,
            "product_id": 30,
            "quantity": 32,
            "cost": 1199,
            "discount": 863,
            "self-closing": true
        },
        {
            "item_id": 661,
            "invoice_id": 289,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 100,
            "cost": 1186,
            "discount": 524,
            "self-closing": true
        },
        {
            "item_id": 662,
            "invoice_id": 220,
            "invoice_item_number": 9,
            "product_id": 8,
            "quantity": 31,
            "cost": 1061,
            "discount": 811,
            "self-closing": true
        },
        {
            "item_id": 663,
            "invoice_id": 360,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 79,
            "cost": 412,
            "discount": 335,
            "self-closing": true
        },
        {
            "item_id": 664,
            "invoice_id": 395,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 35,
            "cost": 339,
            "discount": 460,
            "self-closing": true
        },
        {
            "item_id": 665,
            "invoice_id": 332,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 96,
            "cost": 469,
            "discount": 784,
            "self-closing": true
        },
        {
            "item_id": 666,
            "invoice_id": 183,
            "invoice_item_number": 9,
            "product_id": 16,
            "quantity": 93,
            "cost": 962,
            "discount": 288,
            "self-closing": true
        },
        {
            "item_id": 667,
            "invoice_id": 181,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 38,
            "cost": 1244,
            "discount": 463,
            "self-closing": true
        },
        {
            "item_id": 668,
            "invoice_id": 262,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 58,
            "cost": 656,
            "discount": 943,
            "self-closing": true
        },
        {
            "item_id": 669,
            "invoice_id": 272,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 34,
            "cost": 207,
            "discount": 922,
            "self-closing": true
        },
        {
            "item_id": 670,
            "invoice_id": 369,
            "invoice_item_number": 4,
            "product_id": 25,
            "quantity": 76,
            "cost": 1220,
            "discount": 345,
            "self-closing": true
        },
        {
            "item_id": 671,
            "invoice_id": 52,
            "invoice_item_number": 3,
            "product_id": 14,
            "quantity": 35,
            "cost": 983,
            "discount": 279,
            "self-closing": true
        },
        {
            "item_id": 672,
            "invoice_id": 213,
            "invoice_item_number": 6,
            "product_id": 16,
            "quantity": 42,
            "cost": 310,
            "discount": 447,
            "self-closing": true
        },
        {
            "item_id": 673,
            "invoice_id": 96,
            "invoice_item_number": 7,
            "product_id": 3,
            "quantity": 20,
            "cost": 905,
            "discount": 488,
            "self-closing": true
        },
        {
            "item_id": 674,
            "invoice_id": 122,
            "invoice_item_number": 3,
            "product_id": 19,
            "quantity": 38,
            "cost": 216,
            "discount": 795,
            "self-closing": true
        },
        {
            "item_id": 675,
            "invoice_id": 161,
            "invoice_item_number": 4,
            "product_id": 13,
            "quantity": 83,
            "cost": 1317,
            "discount": 113,
            "self-closing": true
        },
        {
            "item_id": 676,
            "invoice_id": 221,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 39,
            "cost": 623,
            "discount": 461,
            "self-closing": true
        },
        {
            "item_id": 677,
            "invoice_id": 194,
            "invoice_item_number": 6,
            "product_id": 30,
            "quantity": 37,
            "cost": 551,
            "discount": 715,
            "self-closing": true
        },
        {
            "item_id": 678,
            "invoice_id": 352,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 77,
            "cost": 292,
            "discount": 368,
            "self-closing": true
        },
        {
            "item_id": 679,
            "invoice_id": 291,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 89,
            "cost": 395,
            "discount": 302,
            "self-closing": true
        },
        {
            "item_id": 680,
            "invoice_id": 75,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 30,
            "cost": 1000,
            "discount": 100,
            "self-closing": true
        },
        {
            "item_id": 681,
            "invoice_id": 325,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 78,
            "cost": 508,
            "discount": 488,
            "self-closing": true
        },
        {
            "item_id": 682,
            "invoice_id": 324,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 17,
            "cost": 263,
            "discount": 704,
            "self-closing": true
        },
        {
            "item_id": 683,
            "invoice_id": 273,
            "invoice_item_number": 9,
            "product_id": 28,
            "quantity": 20,
            "cost": 58,
            "discount": 39,
            "self-closing": true
        },
        {
            "item_id": 684,
            "invoice_id": 175,
            "invoice_item_number": 5,
            "product_id": 2,
            "quantity": 61,
            "cost": 986,
            "discount": 654,
            "self-closing": true
        },
        {
            "item_id": 685,
            "invoice_id": 76,
            "invoice_item_number": 1,
            "product_id": 2,
            "quantity": 45,
            "cost": 1492,
            "discount": 34,
            "self-closing": true
        },
        {
            "item_id": 686,
            "invoice_id": 76,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 6,
            "cost": 567,
            "discount": 13,
            "self-closing": true
        },
        {
            "item_id": 687,
            "invoice_id": 236,
            "invoice_item_number": 6,
            "product_id": 16,
            "quantity": 32,
            "cost": 287,
            "discount": 394,
            "self-closing": true
        },
        {
            "item_id": 688,
            "invoice_id": 321,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 89,
            "cost": 1382,
            "discount": 284,
            "self-closing": true
        },
        {
            "item_id": 689,
            "invoice_id": 130,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 60,
            "cost": 386,
            "discount": 172,
            "self-closing": true
        },
        {
            "item_id": 690,
            "invoice_id": 239,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 99,
            "cost": 200,
            "discount": 981,
            "self-closing": true
        },
        {
            "item_id": 691,
            "invoice_id": 301,
            "invoice_item_number": 8,
            "product_id": 12,
            "quantity": 20,
            "cost": 975,
            "discount": 550,
            "self-closing": true
        },
        {
            "item_id": 692,
            "invoice_id": 292,
            "invoice_item_number": 1,
            "product_id": 7,
            "quantity": 62,
            "cost": 1133,
            "discount": 275,
            "self-closing": true
        },
        {
            "item_id": 693,
            "invoice_id": 289,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 33,
            "cost": 1357,
            "discount": 991,
            "self-closing": true
        },
        {
            "item_id": 694,
            "invoice_id": 322,
            "invoice_item_number": 5,
            "product_id": 21,
            "quantity": 84,
            "cost": 1452,
            "discount": 210,
            "self-closing": true
        },
        {
            "item_id": 695,
            "invoice_id": 370,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 57,
            "cost": 1414,
            "discount": 394,
            "self-closing": true
        },
        {
            "item_id": 696,
            "invoice_id": 226,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 22,
            "cost": 730,
            "discount": 164,
            "self-closing": true
        },
        {
            "item_id": 697,
            "invoice_id": 357,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 32,
            "cost": 740,
            "discount": 902,
            "self-closing": true
        },
        {
            "item_id": 698,
            "invoice_id": 259,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 37,
            "cost": 155,
            "discount": 253,
            "self-closing": true
        },
        {
            "item_id": 699,
            "invoice_id": 218,
            "invoice_item_number": 6,
            "product_id": 26,
            "quantity": 79,
            "cost": 400,
            "discount": 769,
            "self-closing": true
        },
        {
            "item_id": 700,
            "invoice_id": 335,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 94,
            "cost": 53,
            "discount": 762,
            "self-closing": true
        },
        {
            "item_id": 701,
            "invoice_id": 316,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 13,
            "cost": 515,
            "discount": 275,
            "self-closing": true
        },
        {
            "item_id": 702,
            "invoice_id": 77,
            "invoice_item_number": 1,
            "product_id": 3,
            "quantity": 28,
            "cost": 349,
            "discount": 34,
            "self-closing": true
        },
        {
            "item_id": 703,
            "invoice_id": 201,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 79,
            "cost": 173,
            "discount": 869,
            "self-closing": true
        },
        {
            "item_id": 704,
            "invoice_id": 182,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 73,
            "cost": 878,
            "discount": 894,
            "self-closing": true
        },
        {
            "item_id": 705,
            "invoice_id": 26,
            "invoice_item_number": 1,
            "product_id": 12,
            "quantity": 92,
            "cost": 1345,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 706,
            "invoice_id": 251,
            "invoice_item_number": 6,
            "product_id": 12,
            "quantity": 16,
            "cost": 1183,
            "discount": 175,
            "self-closing": true
        },
        {
            "item_id": 707,
            "invoice_id": 335,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 22,
            "cost": 782,
            "discount": 58,
            "self-closing": true
        },
        {
            "item_id": 708,
            "invoice_id": 237,
            "invoice_item_number": 7,
            "product_id": 17,
            "quantity": 92,
            "cost": 415,
            "discount": 702,
            "self-closing": true
        },
        {
            "item_id": 709,
            "invoice_id": 15,
            "invoice_item_number": 4,
            "product_id": 7,
            "quantity": 72,
            "cost": 1378,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 710,
            "invoice_id": 202,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 47,
            "cost": 582,
            "discount": 435,
            "self-closing": true
        },
        {
            "item_id": 711,
            "invoice_id": 133,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 76,
            "cost": 1384,
            "discount": 231,
            "self-closing": true
        },
        {
            "item_id": 712,
            "invoice_id": 215,
            "invoice_item_number": 9,
            "product_id": 3,
            "quantity": 71,
            "cost": 864,
            "discount": 399,
            "self-closing": true
        },
        {
            "item_id": 713,
            "invoice_id": 12,
            "invoice_item_number": 1,
            "product_id": 13,
            "quantity": 73,
            "cost": 992,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 714,
            "invoice_id": 65,
            "invoice_item_number": 9,
            "product_id": 14,
            "quantity": 35,
            "cost": 657,
            "discount": 938,
            "self-closing": true
        },
        {
            "item_id": 715,
            "invoice_id": 390,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 33,
            "cost": 1440,
            "discount": 415,
            "self-closing": true
        },
        {
            "item_id": 716,
            "invoice_id": 6,
            "invoice_item_number": 1,
            "product_id": 1,
            "quantity": 57,
            "cost": 978,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 717,
            "invoice_id": 384,
            "invoice_item_number": 9,
            "product_id": 23,
            "quantity": 56,
            "cost": 1383,
            "discount": 415,
            "self-closing": true
        },
        {
            "item_id": 718,
            "invoice_id": 219,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 39,
            "cost": 979,
            "discount": 308,
            "self-closing": true
        },
        {
            "item_id": 719,
            "invoice_id": 193,
            "invoice_item_number": 4,
            "product_id": 17,
            "quantity": 83,
            "cost": 1141,
            "discount": 981,
            "self-closing": true
        },
        {
            "item_id": 720,
            "invoice_id": 77,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 16,
            "cost": 450,
            "discount": 5,
            "self-closing": true
        },
        {
            "item_id": 721,
            "invoice_id": 385,
            "invoice_item_number": 8,
            "product_id": 6,
            "quantity": 39,
            "cost": 866,
            "discount": 414,
            "self-closing": true
        },
        {
            "item_id": 722,
            "invoice_id": 4,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 84,
            "cost": 1319,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 723,
            "invoice_id": 374,
            "invoice_item_number": 6,
            "product_id": 29,
            "quantity": 98,
            "cost": 1091,
            "discount": 719,
            "self-closing": true
        },
        {
            "item_id": 724,
            "invoice_id": 128,
            "invoice_item_number": 2,
            "product_id": 30,
            "quantity": 84,
            "cost": 1199,
            "discount": 468,
            "self-closing": true
        },
        {
            "item_id": 725,
            "invoice_id": 253,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 11,
            "cost": 622,
            "discount": 770,
            "self-closing": true
        },
        {
            "item_id": 726,
            "invoice_id": 394,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 96,
            "cost": 950,
            "discount": 414,
            "self-closing": true
        },
        {
            "item_id": 727,
            "invoice_id": 96,
            "invoice_item_number": 8,
            "product_id": 29,
            "quantity": 38,
            "cost": 178,
            "discount": 400,
            "self-closing": true
        },
        {
            "item_id": 728,
            "invoice_id": 53,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 64,
            "cost": 226,
            "discount": 408,
            "self-closing": true
        },
        {
            "item_id": 729,
            "invoice_id": 185,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 46,
            "cost": 1433,
            "discount": 954,
            "self-closing": true
        },
        {
            "item_id": 730,
            "invoice_id": 11,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 73,
            "cost": 316,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 731,
            "invoice_id": 78,
            "invoice_item_number": 1,
            "product_id": 3,
            "quantity": 74,
            "cost": 890,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 732,
            "invoice_id": 94,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 88,
            "cost": 1284,
            "discount": 798,
            "self-closing": true
        },
        {
            "item_id": 733,
            "invoice_id": 228,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 24,
            "cost": 75,
            "discount": 407,
            "self-closing": true
        },
        {
            "item_id": 734,
            "invoice_id": 224,
            "invoice_item_number": 5,
            "product_id": 24,
            "quantity": 19,
            "cost": 249,
            "discount": 325,
            "self-closing": true
        },
        {
            "item_id": 735,
            "invoice_id": 107,
            "invoice_item_number": 4,
            "product_id": 14,
            "quantity": 27,
            "cost": 1000,
            "discount": 631,
            "self-closing": true
        },
        {
            "item_id": 736,
            "invoice_id": 16,
            "invoice_item_number": 1,
            "product_id": 11,
            "quantity": 18,
            "cost": 1305,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 737,
            "invoice_id": 125,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 36,
            "cost": 810,
            "discount": 834,
            "self-closing": true
        },
        {
            "item_id": 738,
            "invoice_id": 233,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 32,
            "cost": 107,
            "discount": 742,
            "self-closing": true
        },
        {
            "item_id": 739,
            "invoice_id": 64,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 69,
            "cost": 1331,
            "discount": 87,
            "self-closing": true
        },
        {
            "item_id": 740,
            "invoice_id": 240,
            "invoice_item_number": 8,
            "product_id": 24,
            "quantity": 50,
            "cost": 512,
            "discount": 319,
            "self-closing": true
        },
        {
            "item_id": 741,
            "invoice_id": 303,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 61,
            "cost": 1218,
            "discount": 604,
            "self-closing": true
        },
        {
            "item_id": 742,
            "invoice_id": 307,
            "invoice_item_number": 8,
            "product_id": 17,
            "quantity": 56,
            "cost": 877,
            "discount": 906,
            "self-closing": true
        },
        {
            "item_id": 743,
            "invoice_id": 140,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 59,
            "cost": 1057,
            "discount": 691,
            "self-closing": true
        },
        {
            "item_id": 744,
            "invoice_id": 27,
            "invoice_item_number": 9,
            "product_id": 20,
            "quantity": 34,
            "cost": 346,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 745,
            "invoice_id": 55,
            "invoice_item_number": 8,
            "product_id": 25,
            "quantity": 91,
            "cost": 220,
            "discount": 480,
            "self-closing": true
        },
        {
            "item_id": 746,
            "invoice_id": 223,
            "invoice_item_number": 5,
            "product_id": 21,
            "quantity": 38,
            "cost": 1275,
            "discount": 786,
            "self-closing": true
        },
        {
            "item_id": 747,
            "invoice_id": 348,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 65,
            "cost": 1082,
            "discount": 36,
            "self-closing": true
        },
        {
            "item_id": 748,
            "invoice_id": 78,
            "invoice_item_number": 2,
            "product_id": 17,
            "quantity": 47,
            "cost": 567,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 749,
            "invoice_id": 95,
            "invoice_item_number": 8,
            "product_id": 18,
            "quantity": 42,
            "cost": 165,
            "discount": 679,
            "self-closing": true
        },
        {
            "item_id": 750,
            "invoice_id": 204,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 94,
            "cost": 458,
            "discount": 694,
            "self-closing": true
        },
        {
            "item_id": 751,
            "invoice_id": 25,
            "invoice_item_number": 4,
            "product_id": 3,
            "quantity": 66,
            "cost": 681,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 752,
            "invoice_id": 106,
            "invoice_item_number": 2,
            "product_id": 26,
            "quantity": 67,
            "cost": 626,
            "discount": 586,
            "self-closing": true
        },
        {
            "item_id": 753,
            "invoice_id": 78,
            "invoice_item_number": 4,
            "product_id": 29,
            "quantity": 11,
            "cost": 123,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 754,
            "invoice_id": 78,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 147,
            "cost": 9800,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 755,
            "invoice_id": 297,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 27,
            "cost": 1011,
            "discount": 539,
            "self-closing": true
        },
        {
            "item_id": 756,
            "invoice_id": 356,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 65,
            "cost": 647,
            "discount": 138,
            "self-closing": true
        },
        {
            "item_id": 757,
            "invoice_id": 286,
            "invoice_item_number": 9,
            "product_id": 9,
            "quantity": 53,
            "cost": 458,
            "discount": 709,
            "self-closing": true
        },
        {
            "item_id": 758,
            "invoice_id": 45,
            "invoice_item_number": 7,
            "product_id": 23,
            "quantity": 66,
            "cost": 350,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 759,
            "invoice_id": 30,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 86,
            "cost": 337,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 760,
            "invoice_id": 213,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 96,
            "cost": 149,
            "discount": 235,
            "self-closing": true
        },
        {
            "item_id": 761,
            "invoice_id": 133,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 51,
            "cost": 887,
            "discount": 203,
            "self-closing": true
        },
        {
            "item_id": 762,
            "invoice_id": 92,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 21,
            "cost": 583,
            "discount": 888,
            "self-closing": true
        },
        {
            "item_id": 763,
            "invoice_id": 213,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 33,
            "cost": 928,
            "discount": 934,
            "self-closing": true
        },
        {
            "item_id": 764,
            "invoice_id": 301,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 28,
            "cost": 1353,
            "discount": 174,
            "self-closing": true
        },
        {
            "item_id": 765,
            "invoice_id": 165,
            "invoice_item_number": 8,
            "product_id": 8,
            "quantity": 79,
            "cost": 623,
            "discount": 298,
            "self-closing": true
        },
        {
            "item_id": 766,
            "invoice_id": 82,
            "invoice_item_number": 1,
            "product_id": 5,
            "quantity": 114,
            "cost": 1140,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 767,
            "invoice_id": 14,
            "invoice_item_number": 5,
            "product_id": 21,
            "quantity": 70,
            "cost": 975,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 768,
            "invoice_id": 170,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 73,
            "cost": 298,
            "discount": 731,
            "self-closing": true
        },
        {
            "item_id": 769,
            "invoice_id": 326,
            "invoice_item_number": 8,
            "product_id": 16,
            "quantity": 88,
            "cost": 1482,
            "discount": 320,
            "self-closing": true
        },
        {
            "item_id": 770,
            "invoice_id": 222,
            "invoice_item_number": 6,
            "product_id": 7,
            "quantity": 81,
            "cost": 740,
            "discount": 885,
            "self-closing": true
        },
        {
            "item_id": 771,
            "invoice_id": 333,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 10,
            "cost": 743,
            "discount": 470,
            "self-closing": true
        },
        {
            "item_id": 772,
            "invoice_id": 347,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 27,
            "cost": 68,
            "discount": 499,
            "self-closing": true
        },
        {
            "item_id": 773,
            "invoice_id": 285,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 77,
            "cost": 410,
            "discount": 388,
            "self-closing": true
        },
        {
            "item_id": 774,
            "invoice_id": 4,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 100,
            "cost": 378,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 775,
            "invoice_id": 60,
            "invoice_item_number": 6,
            "product_id": 23,
            "quantity": 17,
            "cost": 201,
            "discount": 307,
            "self-closing": true
        },
        {
            "item_id": 776,
            "invoice_id": 330,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 80,
            "cost": 66,
            "discount": 911,
            "self-closing": true
        },
        {
            "item_id": 777,
            "invoice_id": 230,
            "invoice_item_number": 9,
            "product_id": 9,
            "quantity": 92,
            "cost": 695,
            "discount": 123,
            "self-closing": true
        },
        {
            "item_id": 778,
            "invoice_id": 239,
            "invoice_item_number": 8,
            "product_id": 15,
            "quantity": 10,
            "cost": 547,
            "discount": 981,
            "self-closing": true
        },
        {
            "item_id": 779,
            "invoice_id": 21,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 69,
            "cost": 1438,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 780,
            "invoice_id": 127,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 42,
            "cost": 116,
            "discount": 680,
            "self-closing": true
        },
        {
            "item_id": 781,
            "invoice_id": 6,
            "invoice_item_number": 3,
            "product_id": 15,
            "quantity": 45,
            "cost": 685,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 782,
            "invoice_id": 94,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 35,
            "cost": 180,
            "discount": 890,
            "self-closing": true
        },
        {
            "item_id": 783,
            "invoice_id": 32,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 80,
            "cost": 1274,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 784,
            "invoice_id": 8,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 82,
            "cost": 948,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 785,
            "invoice_id": 348,
            "invoice_item_number": 8,
            "product_id": 30,
            "quantity": 76,
            "cost": 1144,
            "discount": 673,
            "self-closing": true
        },
        {
            "item_id": 786,
            "invoice_id": 205,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 40,
            "cost": 1434,
            "discount": 236,
            "self-closing": true
        },
        {
            "item_id": 787,
            "invoice_id": 231,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 98,
            "cost": 1110,
            "discount": 22,
            "self-closing": true
        },
        {
            "item_id": 788,
            "invoice_id": 329,
            "invoice_item_number": 8,
            "product_id": 9,
            "quantity": 20,
            "cost": 714,
            "discount": 84,
            "self-closing": true
        },
        {
            "item_id": 789,
            "invoice_id": 221,
            "invoice_item_number": 6,
            "product_id": 12,
            "quantity": 66,
            "cost": 1230,
            "discount": 974,
            "self-closing": true
        },
        {
            "item_id": 790,
            "invoice_id": 253,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 100,
            "cost": 509,
            "discount": 898,
            "self-closing": true
        },
        {
            "item_id": 791,
            "invoice_id": 205,
            "invoice_item_number": 6,
            "product_id": 19,
            "quantity": 71,
            "cost": 256,
            "discount": 729,
            "self-closing": true
        },
        {
            "item_id": 792,
            "invoice_id": 122,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 99,
            "cost": 914,
            "discount": 76,
            "self-closing": true
        },
        {
            "item_id": 793,
            "invoice_id": 397,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 59,
            "cost": 1245,
            "discount": 938,
            "self-closing": true
        },
        {
            "item_id": 794,
            "invoice_id": 87,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 11,
            "cost": 163,
            "discount": 868,
            "self-closing": true
        },
        {
            "item_id": 795,
            "invoice_id": 378,
            "invoice_item_number": 7,
            "product_id": 12,
            "quantity": 29,
            "cost": 271,
            "discount": 307,
            "self-closing": true
        },
        {
            "item_id": 796,
            "invoice_id": 330,
            "invoice_item_number": 6,
            "product_id": 13,
            "quantity": 24,
            "cost": 240,
            "discount": 814,
            "self-closing": true
        },
        {
            "item_id": 797,
            "invoice_id": 316,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 30,
            "cost": 652,
            "discount": 550,
            "self-closing": true
        },
        {
            "item_id": 798,
            "invoice_id": 212,
            "invoice_item_number": 4,
            "product_id": 3,
            "quantity": 84,
            "cost": 311,
            "discount": 663,
            "self-closing": true
        },
        {
            "item_id": 799,
            "invoice_id": 218,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 34,
            "cost": 284,
            "discount": 718,
            "self-closing": true
        },
        {
            "item_id": 800,
            "invoice_id": 117,
            "invoice_item_number": 4,
            "product_id": 10,
            "quantity": 65,
            "cost": 663,
            "discount": 872,
            "self-closing": true
        },
        {
            "item_id": 801,
            "invoice_id": 2,
            "invoice_item_number": 1,
            "product_id": 25,
            "quantity": 32,
            "cost": 1106,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 802,
            "invoice_id": 108,
            "invoice_item_number": 4,
            "product_id": 21,
            "quantity": 77,
            "cost": 476,
            "discount": 599,
            "self-closing": true
        },
        {
            "item_id": 803,
            "invoice_id": 172,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 90,
            "cost": 346,
            "discount": 187,
            "self-closing": true
        },
        {
            "item_id": 804,
            "invoice_id": 234,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 54,
            "cost": 655,
            "discount": 317,
            "self-closing": true
        },
        {
            "item_id": 805,
            "invoice_id": 202,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 88,
            "cost": 1043,
            "discount": 579,
            "self-closing": true
        },
        {
            "item_id": 806,
            "invoice_id": 339,
            "invoice_item_number": 3,
            "product_id": 27,
            "quantity": 84,
            "cost": 1039,
            "discount": 389,
            "self-closing": true
        },
        {
            "item_id": 807,
            "invoice_id": 195,
            "invoice_item_number": 5,
            "product_id": 10,
            "quantity": 51,
            "cost": 522,
            "discount": 949,
            "self-closing": true
        },
        {
            "item_id": 808,
            "invoice_id": 25,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 96,
            "cost": 698,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 809,
            "invoice_id": 121,
            "invoice_item_number": 2,
            "product_id": 17,
            "quantity": 11,
            "cost": 278,
            "discount": 507,
            "self-closing": true
        },
        {
            "item_id": 810,
            "invoice_id": 118,
            "invoice_item_number": 4,
            "product_id": 18,
            "quantity": 14,
            "cost": 1417,
            "discount": 53,
            "self-closing": true
        },
        {
            "item_id": 811,
            "invoice_id": 2,
            "invoice_item_number": 2,
            "product_id": 30,
            "quantity": 10,
            "cost": 1352,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 812,
            "invoice_id": 140,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 45,
            "cost": 182,
            "discount": 753,
            "self-closing": true
        },
        {
            "item_id": 813,
            "invoice_id": 147,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 72,
            "cost": 918,
            "discount": 452,
            "self-closing": true
        },
        {
            "item_id": 814,
            "invoice_id": 243,
            "invoice_item_number": 3,
            "product_id": 19,
            "quantity": 17,
            "cost": 788,
            "discount": 639,
            "self-closing": true
        },
        {
            "item_id": 815,
            "invoice_id": 121,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 52,
            "cost": 263,
            "discount": 618,
            "self-closing": true
        },
        {
            "item_id": 816,
            "invoice_id": 293,
            "invoice_item_number": 5,
            "product_id": 26,
            "quantity": 27,
            "cost": 121,
            "discount": 129,
            "self-closing": true
        },
        {
            "item_id": 817,
            "invoice_id": 396,
            "invoice_item_number": 3,
            "product_id": 2,
            "quantity": 75,
            "cost": 967,
            "discount": 155,
            "self-closing": true
        },
        {
            "item_id": 818,
            "invoice_id": 378,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 97,
            "cost": 1149,
            "discount": 414,
            "self-closing": true
        },
        {
            "item_id": 819,
            "invoice_id": 175,
            "invoice_item_number": 6,
            "product_id": 26,
            "quantity": 92,
            "cost": 855,
            "discount": 625,
            "self-closing": true
        },
        {
            "item_id": 820,
            "invoice_id": 200,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 78,
            "cost": 629,
            "discount": 122,
            "self-closing": true
        },
        {
            "item_id": 821,
            "invoice_id": 132,
            "invoice_item_number": 9,
            "product_id": 29,
            "quantity": 95,
            "cost": 1124,
            "discount": 480,
            "self-closing": true
        },
        {
            "item_id": 822,
            "invoice_id": 118,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 45,
            "cost": 184,
            "discount": 508,
            "self-closing": true
        },
        {
            "item_id": 823,
            "invoice_id": 54,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 55,
            "cost": 1294,
            "discount": 694,
            "self-closing": true
        },
        {
            "item_id": 824,
            "invoice_id": 258,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 90,
            "cost": 746,
            "discount": 690,
            "self-closing": true
        },
        {
            "item_id": 825,
            "invoice_id": 68,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 60,
            "cost": 823,
            "discount": 370,
            "self-closing": true
        },
        {
            "item_id": 826,
            "invoice_id": 321,
            "invoice_item_number": 7,
            "product_id": 16,
            "quantity": 68,
            "cost": 36,
            "discount": 491,
            "self-closing": true
        },
        {
            "item_id": 827,
            "invoice_id": 340,
            "invoice_item_number": 9,
            "product_id": 19,
            "quantity": 76,
            "cost": 423,
            "discount": 526,
            "self-closing": true
        },
        {
            "item_id": 828,
            "invoice_id": 146,
            "invoice_item_number": 7,
            "product_id": 29,
            "quantity": 13,
            "cost": 844,
            "discount": 793,
            "self-closing": true
        },
        {
            "item_id": 829,
            "invoice_id": 321,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 33,
            "cost": 1095,
            "discount": 214,
            "self-closing": true
        },
        {
            "item_id": 830,
            "invoice_id": 390,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 16,
            "cost": 1053,
            "discount": 283,
            "self-closing": true
        },
        {
            "item_id": 831,
            "invoice_id": 78,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 59,
            "cost": 670,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 832,
            "invoice_id": 187,
            "invoice_item_number": 6,
            "product_id": 28,
            "quantity": 40,
            "cost": 952,
            "discount": 361,
            "self-closing": true
        },
        {
            "item_id": 833,
            "invoice_id": 361,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 16,
            "cost": 560,
            "discount": 368,
            "self-closing": true
        },
        {
            "item_id": 834,
            "invoice_id": 345,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 51,
            "cost": 210,
            "discount": 977,
            "self-closing": true
        },
        {
            "item_id": 835,
            "invoice_id": 26,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 62,
            "cost": 518,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 836,
            "invoice_id": 374,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 56,
            "cost": 1413,
            "discount": 585,
            "self-closing": true
        },
        {
            "item_id": 837,
            "invoice_id": 260,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 66,
            "cost": 1256,
            "discount": 321,
            "self-closing": true
        },
        {
            "item_id": 838,
            "invoice_id": 391,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 10,
            "cost": 830,
            "discount": 799,
            "self-closing": true
        },
        {
            "item_id": 839,
            "invoice_id": 389,
            "invoice_item_number": 4,
            "product_id": 21,
            "quantity": 89,
            "cost": 1113,
            "discount": 899,
            "self-closing": true
        },
        {
            "item_id": 840,
            "invoice_id": 170,
            "invoice_item_number": 7,
            "product_id": 16,
            "quantity": 38,
            "cost": 580,
            "discount": 884,
            "self-closing": true
        },
        {
            "item_id": 841,
            "invoice_id": 173,
            "invoice_item_number": 9,
            "product_id": 3,
            "quantity": 40,
            "cost": 58,
            "discount": 836,
            "self-closing": true
        },
        {
            "item_id": 842,
            "invoice_id": 108,
            "invoice_item_number": 4,
            "product_id": 14,
            "quantity": 81,
            "cost": 452,
            "discount": 489,
            "self-closing": true
        },
        {
            "item_id": 843,
            "invoice_id": 340,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 61,
            "cost": 1104,
            "discount": 191,
            "self-closing": true
        },
        {
            "item_id": 844,
            "invoice_id": 260,
            "invoice_item_number": 4,
            "product_id": 12,
            "quantity": 32,
            "cost": 366,
            "discount": 205,
            "self-closing": true
        },
        {
            "item_id": 845,
            "invoice_id": 125,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 59,
            "cost": 227,
            "discount": 239,
            "self-closing": true
        },
        {
            "item_id": 846,
            "invoice_id": 78,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 96,
            "cost": 800,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 847,
            "invoice_id": 329,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 54,
            "cost": 1360,
            "discount": 646,
            "self-closing": true
        },
        {
            "item_id": 848,
            "invoice_id": 329,
            "invoice_item_number": 8,
            "product_id": 18,
            "quantity": 28,
            "cost": 1292,
            "discount": 987,
            "self-closing": true
        },
        {
            "item_id": 849,
            "invoice_id": 35,
            "invoice_item_number": 3,
            "product_id": 25,
            "quantity": 91,
            "cost": 109,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 850,
            "invoice_id": 6,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 72,
            "cost": 91,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 851,
            "invoice_id": 235,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 41,
            "cost": 863,
            "discount": 688,
            "self-closing": true
        },
        {
            "item_id": 852,
            "invoice_id": 267,
            "invoice_item_number": 2,
            "product_id": 24,
            "quantity": 68,
            "cost": 771,
            "discount": 704,
            "self-closing": true
        },
        {
            "item_id": 853,
            "invoice_id": 297,
            "invoice_item_number": 2,
            "product_id": 30,
            "quantity": 59,
            "cost": 89,
            "discount": 845,
            "self-closing": true
        },
        {
            "item_id": 854,
            "invoice_id": 297,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 89,
            "cost": 31,
            "discount": 981,
            "self-closing": true
        },
        {
            "item_id": 855,
            "invoice_id": 29,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 50,
            "cost": 1221,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 856,
            "invoice_id": 119,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 15,
            "cost": 798,
            "discount": 532,
            "self-closing": true
        },
        {
            "item_id": 857,
            "invoice_id": 269,
            "invoice_item_number": 9,
            "product_id": 30,
            "quantity": 37,
            "cost": 294,
            "discount": 899,
            "self-closing": true
        },
        {
            "item_id": 858,
            "invoice_id": 104,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 13,
            "cost": 575,
            "discount": 878,
            "self-closing": true
        },
        {
            "item_id": 859,
            "invoice_id": 187,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 43,
            "cost": 881,
            "discount": 62,
            "self-closing": true
        },
        {
            "item_id": 860,
            "invoice_id": 127,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 39,
            "cost": 903,
            "discount": 670,
            "self-closing": true
        },
        {
            "item_id": 861,
            "invoice_id": 92,
            "invoice_item_number": 2,
            "product_id": 25,
            "quantity": 56,
            "cost": 375,
            "discount": 191,
            "self-closing": true
        },
        {
            "item_id": 862,
            "invoice_id": 188,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 60,
            "cost": 1103,
            "discount": 774,
            "self-closing": true
        },
        {
            "item_id": 863,
            "invoice_id": 35,
            "invoice_item_number": 8,
            "product_id": 22,
            "quantity": 51,
            "cost": 101,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 864,
            "invoice_id": 373,
            "invoice_item_number": 2,
            "product_id": 28,
            "quantity": 84,
            "cost": 304,
            "discount": 37,
            "self-closing": true
        },
        {
            "item_id": 865,
            "invoice_id": 338,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 46,
            "cost": 357,
            "discount": 263,
            "self-closing": true
        },
        {
            "item_id": 866,
            "invoice_id": 87,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 47,
            "cost": 1122,
            "discount": 378,
            "self-closing": true
        },
        {
            "item_id": 867,
            "invoice_id": 78,
            "invoice_item_number": 6,
            "product_id": 22,
            "quantity": 69,
            "cost": 600,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 868,
            "invoice_id": 125,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 96,
            "cost": 532,
            "discount": 592,
            "self-closing": true
        },
        {
            "item_id": 869,
            "invoice_id": 78,
            "invoice_item_number": 8,
            "product_id": 12,
            "quantity": 95,
            "cost": 880,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 870,
            "invoice_id": 104,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 80,
            "cost": 340,
            "discount": 880,
            "self-closing": true
        },
        {
            "item_id": 871,
            "invoice_id": 79,
            "invoice_item_number": 1,
            "product_id": 2,
            "quantity": 65,
            "cost": 612,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 872,
            "invoice_id": 211,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 88,
            "cost": 1025,
            "discount": 101,
            "self-closing": true
        },
        {
            "item_id": 873,
            "invoice_id": 101,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 70,
            "cost": 1104,
            "discount": 70,
            "self-closing": true
        },
        {
            "item_id": 874,
            "invoice_id": 71,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 99,
            "cost": 828,
            "discount": 492,
            "self-closing": true
        },
        {
            "item_id": 875,
            "invoice_id": 107,
            "invoice_item_number": 8,
            "product_id": 20,
            "quantity": 26,
            "cost": 1030,
            "discount": 877,
            "self-closing": true
        },
        {
            "item_id": 876,
            "invoice_id": 346,
            "invoice_item_number": 7,
            "product_id": 28,
            "quantity": 80,
            "cost": 373,
            "discount": 836,
            "self-closing": true
        },
        {
            "item_id": 877,
            "invoice_id": 272,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 55,
            "cost": 739,
            "discount": 830,
            "self-closing": true
        },
        {
            "item_id": 878,
            "invoice_id": 131,
            "invoice_item_number": 7,
            "product_id": 23,
            "quantity": 21,
            "cost": 133,
            "discount": 498,
            "self-closing": true
        },
        {
            "item_id": 879,
            "invoice_id": 79,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 56,
            "cost": 530,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 880,
            "invoice_id": 293,
            "invoice_item_number": 7,
            "product_id": 7,
            "quantity": 20,
            "cost": 441,
            "discount": 505,
            "self-closing": true
        },
        {
            "item_id": 881,
            "invoice_id": 345,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 49,
            "cost": 104,
            "discount": 380,
            "self-closing": true
        },
        {
            "item_id": 882,
            "invoice_id": 286,
            "invoice_item_number": 8,
            "product_id": 8,
            "quantity": 45,
            "cost": 633,
            "discount": 886,
            "self-closing": true
        },
        {
            "item_id": 883,
            "invoice_id": 79,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 12,
            "cost": 140,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 884,
            "invoice_id": 132,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 35,
            "cost": 1168,
            "discount": 12,
            "self-closing": true
        },
        {
            "item_id": 885,
            "invoice_id": 317,
            "invoice_item_number": 6,
            "product_id": 4,
            "quantity": 26,
            "cost": 905,
            "discount": 920,
            "self-closing": true
        },
        {
            "item_id": 886,
            "invoice_id": 278,
            "invoice_item_number": 6,
            "product_id": 7,
            "quantity": 77,
            "cost": 263,
            "discount": 657,
            "self-closing": true
        },
        {
            "item_id": 887,
            "invoice_id": 334,
            "invoice_item_number": 5,
            "product_id": 19,
            "quantity": 46,
            "cost": 1120,
            "discount": 618,
            "self-closing": true
        },
        {
            "item_id": 888,
            "invoice_id": 85,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 82,
            "cost": 639,
            "discount": 266,
            "self-closing": true
        },
        {
            "item_id": 889,
            "invoice_id": 261,
            "invoice_item_number": 9,
            "product_id": 1,
            "quantity": 98,
            "cost": 788,
            "discount": 679,
            "self-closing": true
        },
        {
            "item_id": 890,
            "invoice_id": 207,
            "invoice_item_number": 7,
            "product_id": 4,
            "quantity": 76,
            "cost": 895,
            "discount": 382,
            "self-closing": true
        },
        {
            "item_id": 891,
            "invoice_id": 275,
            "invoice_item_number": 6,
            "product_id": 29,
            "quantity": 84,
            "cost": 833,
            "discount": 82,
            "self-closing": true
        },
        {
            "item_id": 892,
            "invoice_id": 99,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 42,
            "cost": 1310,
            "discount": 838,
            "self-closing": true
        },
        {
            "item_id": 893,
            "invoice_id": 92,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 29,
            "cost": 1023,
            "discount": 266,
            "self-closing": true
        },
        {
            "item_id": 894,
            "invoice_id": 208,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 38,
            "cost": 960,
            "discount": 115,
            "self-closing": true
        },
        {
            "item_id": 895,
            "invoice_id": 224,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 77,
            "cost": 400,
            "discount": 512,
            "self-closing": true
        },
        {
            "item_id": 896,
            "invoice_id": 374,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 81,
            "cost": 1419,
            "discount": 230,
            "self-closing": true
        },
        {
            "item_id": 897,
            "invoice_id": 312,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 91,
            "cost": 870,
            "discount": 262,
            "self-closing": true
        },
        {
            "item_id": 898,
            "invoice_id": 38,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 70,
            "cost": 1325,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 899,
            "invoice_id": 180,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 85,
            "cost": 1149,
            "discount": 476,
            "self-closing": true
        },
        {
            "item_id": 900,
            "invoice_id": 56,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 50,
            "cost": 415,
            "discount": 373,
            "self-closing": true
        },
        {
            "item_id": 901,
            "invoice_id": 28,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 45,
            "cost": 51,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 902,
            "invoice_id": 297,
            "invoice_item_number": 2,
            "product_id": 18,
            "quantity": 44,
            "cost": 622,
            "discount": 778,
            "self-closing": true
        },
        {
            "item_id": 903,
            "invoice_id": 19,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 74,
            "cost": 510,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 904,
            "invoice_id": 140,
            "invoice_item_number": 4,
            "product_id": 12,
            "quantity": 41,
            "cost": 947,
            "discount": 779,
            "self-closing": true
        },
        {
            "item_id": 905,
            "invoice_id": 55,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 36,
            "cost": 764,
            "discount": 918,
            "self-closing": true
        },
        {
            "item_id": 906,
            "invoice_id": 62,
            "invoice_item_number": 6,
            "product_id": 22,
            "quantity": 70,
            "cost": 93,
            "discount": 757,
            "self-closing": true
        },
        {
            "item_id": 907,
            "invoice_id": 255,
            "invoice_item_number": 6,
            "product_id": 19,
            "quantity": 21,
            "cost": 192,
            "discount": 29,
            "self-closing": true
        },
        {
            "item_id": 908,
            "invoice_id": 3,
            "invoice_item_number": 1,
            "product_id": 1,
            "quantity": 46,
            "cost": 913,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 909,
            "invoice_id": 400,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 64,
            "cost": 621,
            "discount": 617,
            "self-closing": true
        },
        {
            "item_id": 910,
            "invoice_id": 344,
            "invoice_item_number": 2,
            "product_id": 28,
            "quantity": 84,
            "cost": 904,
            "discount": 900,
            "self-closing": true
        },
        {
            "item_id": 911,
            "invoice_id": 383,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 30,
            "cost": 1467,
            "discount": 212,
            "self-closing": true
        },
        {
            "item_id": 912,
            "invoice_id": 140,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 33,
            "cost": 97,
            "discount": 846,
            "self-closing": true
        },
        {
            "item_id": 913,
            "invoice_id": 34,
            "invoice_item_number": 9,
            "product_id": 14,
            "quantity": 30,
            "cost": 604,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 914,
            "invoice_id": 140,
            "invoice_item_number": 6,
            "product_id": 23,
            "quantity": 69,
            "cost": 674,
            "discount": 228,
            "self-closing": true
        },
        {
            "item_id": 915,
            "invoice_id": 397,
            "invoice_item_number": 8,
            "product_id": 14,
            "quantity": 26,
            "cost": 624,
            "discount": 570,
            "self-closing": true
        },
        {
            "item_id": 916,
            "invoice_id": 182,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 64,
            "cost": 705,
            "discount": 477,
            "self-closing": true
        },
        {
            "item_id": 917,
            "invoice_id": 320,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 13,
            "cost": 174,
            "discount": 955,
            "self-closing": true
        },
        {
            "item_id": 918,
            "invoice_id": 355,
            "invoice_item_number": 7,
            "product_id": 28,
            "quantity": 44,
            "cost": 325,
            "discount": 707,
            "self-closing": true
        },
        {
            "item_id": 919,
            "invoice_id": 79,
            "invoice_item_number": 4,
            "product_id": 25,
            "quantity": 174,
            "cost": 10114,
            "discount": 200,
            "self-closing": true
        },
        {
            "item_id": 920,
            "invoice_id": 392,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 92,
            "cost": 846,
            "discount": 240,
            "self-closing": true
        },
        {
            "item_id": 921,
            "invoice_id": 372,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 63,
            "cost": 1191,
            "discount": 810,
            "self-closing": true
        },
        {
            "item_id": 922,
            "invoice_id": 207,
            "invoice_item_number": 9,
            "product_id": 21,
            "quantity": 55,
            "cost": 645,
            "discount": 116,
            "self-closing": true
        },
        {
            "item_id": 923,
            "invoice_id": 369,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 54,
            "cost": 866,
            "discount": 472,
            "self-closing": true
        },
        {
            "item_id": 924,
            "invoice_id": 290,
            "invoice_item_number": 1,
            "product_id": 11,
            "quantity": 55,
            "cost": 1166,
            "discount": 553,
            "self-closing": true
        },
        {
            "item_id": 925,
            "invoice_id": 310,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 60,
            "cost": 1345,
            "discount": 811,
            "self-closing": true
        },
        {
            "item_id": 926,
            "invoice_id": 79,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 59,
            "cost": 300,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 927,
            "invoice_id": 374,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 81,
            "cost": 1484,
            "discount": 448,
            "self-closing": true
        },
        {
            "item_id": 928,
            "invoice_id": 327,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 30,
            "cost": 279,
            "discount": 207,
            "self-closing": true
        },
        {
            "item_id": 929,
            "invoice_id": 21,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 20,
            "cost": 525,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 930,
            "invoice_id": 233,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 89,
            "cost": 896,
            "discount": 337,
            "self-closing": true
        },
        {
            "item_id": 931,
            "invoice_id": 229,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 87,
            "cost": 970,
            "discount": 670,
            "self-closing": true
        },
        {
            "item_id": 932,
            "invoice_id": 295,
            "invoice_item_number": 9,
            "product_id": 23,
            "quantity": 24,
            "cost": 425,
            "discount": 888,
            "self-closing": true
        },
        {
            "item_id": 933,
            "invoice_id": 192,
            "invoice_item_number": 2,
            "product_id": 20,
            "quantity": 67,
            "cost": 1392,
            "discount": 78,
            "self-closing": true
        },
        {
            "item_id": 934,
            "invoice_id": 125,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 37,
            "cost": 736,
            "discount": 261,
            "self-closing": true
        },
        {
            "item_id": 935,
            "invoice_id": 341,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 66,
            "cost": 507,
            "discount": 169,
            "self-closing": true
        },
        {
            "item_id": 936,
            "invoice_id": 202,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 74,
            "cost": 1203,
            "discount": 224,
            "self-closing": true
        },
        {
            "item_id": 937,
            "invoice_id": 247,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 42,
            "cost": 1027,
            "discount": 145,
            "self-closing": true
        },
        {
            "item_id": 938,
            "invoice_id": 395,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 97,
            "cost": 1141,
            "discount": 534,
            "self-closing": true
        },
        {
            "item_id": 939,
            "invoice_id": 368,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 26,
            "cost": 224,
            "discount": 911,
            "self-closing": true
        },
        {
            "item_id": 940,
            "invoice_id": 198,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 40,
            "cost": 122,
            "discount": 228,
            "self-closing": true
        },
        {
            "item_id": 941,
            "invoice_id": 223,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 47,
            "cost": 1372,
            "discount": 198,
            "self-closing": true
        },
        {
            "item_id": 942,
            "invoice_id": 392,
            "invoice_item_number": 4,
            "product_id": 3,
            "quantity": 26,
            "cost": 1406,
            "discount": 405,
            "self-closing": true
        },
        {
            "item_id": 943,
            "invoice_id": 105,
            "invoice_item_number": 5,
            "product_id": 4,
            "quantity": 52,
            "cost": 1248,
            "discount": 39,
            "self-closing": true
        },
        {
            "item_id": 944,
            "invoice_id": 344,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 31,
            "cost": 642,
            "discount": 491,
            "self-closing": true
        },
        {
            "item_id": 945,
            "invoice_id": 211,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 21,
            "cost": 981,
            "discount": 439,
            "self-closing": true
        },
        {
            "item_id": 946,
            "invoice_id": 102,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 26,
            "cost": 665,
            "discount": 735,
            "self-closing": true
        },
        {
            "item_id": 947,
            "invoice_id": 206,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 89,
            "cost": 754,
            "discount": 663,
            "self-closing": true
        },
        {
            "item_id": 948,
            "invoice_id": 73,
            "invoice_item_number": 5,
            "product_id": 16,
            "quantity": 36,
            "cost": 747,
            "discount": 301,
            "self-closing": true
        },
        {
            "item_id": 949,
            "invoice_id": 315,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 85,
            "cost": 1491,
            "discount": 574,
            "self-closing": true
        },
        {
            "item_id": 950,
            "invoice_id": 324,
            "invoice_item_number": 2,
            "product_id": 18,
            "quantity": 18,
            "cost": 160,
            "discount": 437,
            "self-closing": true
        },
        {
            "item_id": 951,
            "invoice_id": 79,
            "invoice_item_number": 6,
            "product_id": 4,
            "quantity": 21,
            "cost": 100,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 952,
            "invoice_id": 247,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 38,
            "cost": 509,
            "discount": 504,
            "self-closing": true
        },
        {
            "item_id": 953,
            "invoice_id": 130,
            "invoice_item_number": 8,
            "product_id": 12,
            "quantity": 64,
            "cost": 477,
            "discount": 639,
            "self-closing": true
        },
        {
            "item_id": 954,
            "invoice_id": 320,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 66,
            "cost": 942,
            "discount": 777,
            "self-closing": true
        },
        {
            "item_id": 955,
            "invoice_id": 79,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 100,
            "cost": 10000,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 956,
            "invoice_id": 115,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 93,
            "cost": 917,
            "discount": 44,
            "self-closing": true
        },
        {
            "item_id": 957,
            "invoice_id": 238,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 86,
            "cost": 321,
            "discount": 574,
            "self-closing": true
        },
        {
            "item_id": 958,
            "invoice_id": 66,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 25,
            "cost": 595,
            "discount": 892,
            "self-closing": true
        },
        {
            "item_id": 959,
            "invoice_id": 146,
            "invoice_item_number": 9,
            "product_id": 18,
            "quantity": 96,
            "cost": 607,
            "discount": 708,
            "self-closing": true
        },
        {
            "item_id": 960,
            "invoice_id": 335,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 10,
            "cost": 598,
            "discount": 14,
            "self-closing": true
        },
        {
            "item_id": 961,
            "invoice_id": 382,
            "invoice_item_number": 1,
            "product_id": 16,
            "quantity": 35,
            "cost": 1428,
            "discount": 722,
            "self-closing": true
        },
        {
            "item_id": 962,
            "invoice_id": 51,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 77,
            "cost": 815,
            "discount": 968,
            "self-closing": true
        },
        {
            "item_id": 963,
            "invoice_id": 5,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 19,
            "cost": 97,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 964,
            "invoice_id": 283,
            "invoice_item_number": 3,
            "product_id": 25,
            "quantity": 66,
            "cost": 1261,
            "discount": 110,
            "self-closing": true
        },
        {
            "item_id": 965,
            "invoice_id": 96,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 21,
            "cost": 472,
            "discount": 311,
            "self-closing": true
        },
        {
            "item_id": 966,
            "invoice_id": 79,
            "invoice_item_number": 8,
            "product_id": 24,
            "quantity": 41,
            "cost": 400,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 967,
            "invoice_id": 141,
            "invoice_item_number": 1,
            "product_id": 24,
            "quantity": 22,
            "cost": 372,
            "discount": 482,
            "self-closing": true
        },
        {
            "item_id": 968,
            "invoice_id": 243,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 100,
            "cost": 336,
            "discount": 722,
            "self-closing": true
        },
        {
            "item_id": 969,
            "invoice_id": 150,
            "invoice_item_number": 7,
            "product_id": 28,
            "quantity": 34,
            "cost": 1103,
            "discount": 616,
            "self-closing": true
        },
        {
            "item_id": 970,
            "invoice_id": 103,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 22,
            "cost": 267,
            "discount": 861,
            "self-closing": true
        },
        {
            "item_id": 971,
            "invoice_id": 11,
            "invoice_item_number": 2,
            "product_id": 16,
            "quantity": 73,
            "cost": 547,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 972,
            "invoice_id": 236,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 67,
            "cost": 318,
            "discount": 66,
            "self-closing": true
        },
        {
            "item_id": 973,
            "invoice_id": 331,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 29,
            "cost": 415,
            "discount": 559,
            "self-closing": true
        },
        {
            "item_id": 974,
            "invoice_id": 143,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 84,
            "cost": 1023,
            "discount": 844,
            "self-closing": true
        },
        {
            "item_id": 975,
            "invoice_id": 147,
            "invoice_item_number": 5,
            "product_id": 2,
            "quantity": 53,
            "cost": 796,
            "discount": 98,
            "self-closing": true
        },
        {
            "item_id": 976,
            "invoice_id": 355,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 72,
            "cost": 1010,
            "discount": 734,
            "self-closing": true
        },
        {
            "item_id": 977,
            "invoice_id": 287,
            "invoice_item_number": 8,
            "product_id": 7,
            "quantity": 14,
            "cost": 530,
            "discount": 372,
            "self-closing": true
        },
        {
            "item_id": 978,
            "invoice_id": 201,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 41,
            "cost": 1314,
            "discount": 262,
            "self-closing": true
        },
        {
            "item_id": 979,
            "invoice_id": 147,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 97,
            "cost": 60,
            "discount": 864,
            "self-closing": true
        },
        {
            "item_id": 980,
            "invoice_id": 279,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 55,
            "cost": 726,
            "discount": 990,
            "self-closing": true
        },
        {
            "item_id": 981,
            "invoice_id": 7,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 77,
            "cost": 80,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 982,
            "invoice_id": 267,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 65,
            "cost": 1378,
            "discount": 666,
            "self-closing": true
        },
        {
            "item_id": 983,
            "invoice_id": 155,
            "invoice_item_number": 1,
            "product_id": 13,
            "quantity": 30,
            "cost": 3000,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 984,
            "invoice_id": 51,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 74,
            "cost": 1298,
            "discount": 504,
            "self-closing": true
        },
        {
            "item_id": 985,
            "invoice_id": 282,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 20,
            "cost": 1346,
            "discount": 405,
            "self-closing": true
        },
        {
            "item_id": 986,
            "invoice_id": 396,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 47,
            "cost": 1188,
            "discount": 820,
            "self-closing": true
        },
        {
            "item_id": 987,
            "invoice_id": 218,
            "invoice_item_number": 7,
            "product_id": 22,
            "quantity": 36,
            "cost": 1287,
            "discount": 50,
            "self-closing": true
        },
        {
            "item_id": 988,
            "invoice_id": 317,
            "invoice_item_number": 8,
            "product_id": 4,
            "quantity": 29,
            "cost": 334,
            "discount": 515,
            "self-closing": true
        },
        {
            "item_id": 989,
            "invoice_id": 381,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 74,
            "cost": 816,
            "discount": 30,
            "self-closing": true
        },
        {
            "item_id": 990,
            "invoice_id": 103,
            "invoice_item_number": 9,
            "product_id": 18,
            "quantity": 32,
            "cost": 273,
            "discount": 389,
            "self-closing": true
        },
        {
            "item_id": 991,
            "invoice_id": 13,
            "invoice_item_number": 3,
            "product_id": 14,
            "quantity": 91,
            "cost": 317,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 992,
            "invoice_id": 84,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 37,
            "cost": 1442,
            "discount": 312,
            "self-closing": true
        },
        {
            "item_id": 993,
            "invoice_id": 338,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 62,
            "cost": 425,
            "discount": 686,
            "self-closing": true
        },
        {
            "item_id": 994,
            "invoice_id": 174,
            "invoice_item_number": 6,
            "product_id": 6,
            "quantity": 26,
            "cost": 598,
            "discount": 118,
            "self-closing": true
        },
        {
            "item_id": 995,
            "invoice_id": 232,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 70,
            "cost": 1482,
            "discount": 230,
            "self-closing": true
        },
        {
            "item_id": 996,
            "invoice_id": 248,
            "invoice_item_number": 4,
            "product_id": 18,
            "quantity": 92,
            "cost": 1126,
            "discount": 191,
            "self-closing": true
        },
        {
            "item_id": 997,
            "invoice_id": 335,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 35,
            "cost": 1368,
            "discount": 231,
            "self-closing": true
        },
        {
            "item_id": 998,
            "invoice_id": 139,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 19,
            "cost": 1202,
            "discount": 800,
            "self-closing": true
        },
        {
            "item_id": 999,
            "invoice_id": 130,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 14,
            "cost": 258,
            "discount": 564,
            "self-closing": true
        },
        {
            "item_id": 1000,
            "invoice_id": 7,
            "invoice_item_number": 4,
            "product_id": 10,
            "quantity": 43,
            "cost": 1198,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1001,
            "invoice_id": 124,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 43,
            "cost": 1023,
            "discount": 799,
            "self-closing": true
        },
        {
            "item_id": 1002,
            "invoice_id": 118,
            "invoice_item_number": 5,
            "product_id": 26,
            "quantity": 46,
            "cost": 1247,
            "discount": 578,
            "self-closing": true
        },
        {
            "item_id": 1003,
            "invoice_id": 300,
            "invoice_item_number": 8,
            "product_id": 15,
            "quantity": 63,
            "cost": 563,
            "discount": 742,
            "self-closing": true
        },
        {
            "item_id": 1004,
            "invoice_id": 353,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 38,
            "cost": 932,
            "discount": 220,
            "self-closing": true
        },
        {
            "item_id": 1005,
            "invoice_id": 21,
            "invoice_item_number": 4,
            "product_id": 3,
            "quantity": 83,
            "cost": 1029,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1006,
            "invoice_id": 244,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 26,
            "cost": 617,
            "discount": 463,
            "self-closing": true
        },
        {
            "item_id": 1007,
            "invoice_id": 136,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 49,
            "cost": 788,
            "discount": 833,
            "self-closing": true
        },
        {
            "item_id": 1008,
            "invoice_id": 385,
            "invoice_item_number": 3,
            "product_id": 28,
            "quantity": 12,
            "cost": 606,
            "discount": 520,
            "self-closing": true
        },
        {
            "item_id": 1009,
            "invoice_id": 133,
            "invoice_item_number": 6,
            "product_id": 14,
            "quantity": 41,
            "cost": 368,
            "discount": 136,
            "self-closing": true
        },
        {
            "item_id": 1010,
            "invoice_id": 296,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 94,
            "cost": 723,
            "discount": 946,
            "self-closing": true
        },
        {
            "item_id": 1011,
            "invoice_id": 288,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 79,
            "cost": 987,
            "discount": 273,
            "self-closing": true
        },
        {
            "item_id": 1012,
            "invoice_id": 33,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 70,
            "cost": 104,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1013,
            "invoice_id": 242,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 59,
            "cost": 237,
            "discount": 443,
            "self-closing": true
        },
        {
            "item_id": 1014,
            "invoice_id": 14,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 98,
            "cost": 496,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1015,
            "invoice_id": 383,
            "invoice_item_number": 8,
            "product_id": 16,
            "quantity": 14,
            "cost": 1360,
            "discount": 363,
            "self-closing": true
        },
        {
            "item_id": 1016,
            "invoice_id": 122,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 56,
            "cost": 148,
            "discount": 648,
            "self-closing": true
        },
        {
            "item_id": 1017,
            "invoice_id": 315,
            "invoice_item_number": 2,
            "product_id": 30,
            "quantity": 41,
            "cost": 636,
            "discount": 635,
            "self-closing": true
        },
        {
            "item_id": 1018,
            "invoice_id": 57,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 16,
            "cost": 700,
            "discount": 442,
            "self-closing": true
        },
        {
            "item_id": 1019,
            "invoice_id": 268,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 70,
            "cost": 1411,
            "discount": 217,
            "self-closing": true
        },
        {
            "item_id": 1020,
            "invoice_id": 147,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 78,
            "cost": 1243,
            "discount": 969,
            "self-closing": true
        },
        {
            "item_id": 1021,
            "invoice_id": 243,
            "invoice_item_number": 5,
            "product_id": 25,
            "quantity": 94,
            "cost": 1119,
            "discount": 162,
            "self-closing": true
        },
        {
            "item_id": 1022,
            "invoice_id": 234,
            "invoice_item_number": 3,
            "product_id": 23,
            "quantity": 76,
            "cost": 1383,
            "discount": 633,
            "self-closing": true
        },
        {
            "item_id": 1023,
            "invoice_id": 373,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 16,
            "cost": 576,
            "discount": 937,
            "self-closing": true
        },
        {
            "item_id": 1024,
            "invoice_id": 73,
            "invoice_item_number": 8,
            "product_id": 5,
            "quantity": 59,
            "cost": 795,
            "discount": 406,
            "self-closing": true
        },
        {
            "item_id": 1025,
            "invoice_id": 57,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 14,
            "cost": 853,
            "discount": 810,
            "self-closing": true
        },
        {
            "item_id": 1026,
            "invoice_id": 188,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 71,
            "cost": 94,
            "discount": 791,
            "self-closing": true
        },
        {
            "item_id": 1027,
            "invoice_id": 80,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 10,
            "cost": 156,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1028,
            "invoice_id": 387,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 53,
            "cost": 762,
            "discount": 820,
            "self-closing": true
        },
        {
            "item_id": 1029,
            "invoice_id": 61,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 83,
            "cost": 107,
            "discount": 845,
            "self-closing": true
        },
        {
            "item_id": 1030,
            "invoice_id": 240,
            "invoice_item_number": 4,
            "product_id": 12,
            "quantity": 86,
            "cost": 517,
            "discount": 924,
            "self-closing": true
        },
        {
            "item_id": 1031,
            "invoice_id": 183,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 73,
            "cost": 1448,
            "discount": 117,
            "self-closing": true
        },
        {
            "item_id": 1032,
            "invoice_id": 80,
            "invoice_item_number": 6,
            "product_id": 12,
            "quantity": 4,
            "cost": 34,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1033,
            "invoice_id": 335,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 64,
            "cost": 463,
            "discount": 953,
            "self-closing": true
        },
        {
            "item_id": 1034,
            "invoice_id": 114,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 25,
            "cost": 973,
            "discount": 254,
            "self-closing": true
        },
        {
            "item_id": 1035,
            "invoice_id": 84,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 14,
            "cost": 109,
            "discount": 169,
            "self-closing": true
        },
        {
            "item_id": 1036,
            "invoice_id": 306,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 17,
            "cost": 247,
            "discount": 562,
            "self-closing": true
        },
        {
            "item_id": 1037,
            "invoice_id": 97,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 55,
            "cost": 276,
            "discount": 824,
            "self-closing": true
        },
        {
            "item_id": 1038,
            "invoice_id": 112,
            "invoice_item_number": 7,
            "product_id": 15,
            "quantity": 92,
            "cost": 1385,
            "discount": 276,
            "self-closing": true
        },
        {
            "item_id": 1039,
            "invoice_id": 4,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 37,
            "cost": 109,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1040,
            "invoice_id": 273,
            "invoice_item_number": 8,
            "product_id": 5,
            "quantity": 29,
            "cost": 272,
            "discount": 618,
            "self-closing": true
        },
        {
            "item_id": 1041,
            "invoice_id": 73,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 96,
            "cost": 798,
            "discount": 164,
            "self-closing": true
        },
        {
            "item_id": 1042,
            "invoice_id": 80,
            "invoice_item_number": 7,
            "product_id": 3,
            "quantity": 47,
            "cost": 480,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1043,
            "invoice_id": 235,
            "invoice_item_number": 9,
            "product_id": 21,
            "quantity": 22,
            "cost": 1172,
            "discount": 970,
            "self-closing": true
        },
        {
            "item_id": 1044,
            "invoice_id": 286,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 53,
            "cost": 410,
            "discount": 206,
            "self-closing": true
        },
        {
            "item_id": 1045,
            "invoice_id": 273,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 53,
            "cost": 1186,
            "discount": 817,
            "self-closing": true
        },
        {
            "item_id": 1046,
            "invoice_id": 72,
            "invoice_item_number": 8,
            "product_id": 4,
            "quantity": 88,
            "cost": 1498,
            "discount": 788,
            "self-closing": true
        },
        {
            "item_id": 1047,
            "invoice_id": 347,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 35,
            "cost": 677,
            "discount": 867,
            "self-closing": true
        },
        {
            "item_id": 1048,
            "invoice_id": 292,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 66,
            "cost": 596,
            "discount": 379,
            "self-closing": true
        },
        {
            "item_id": 1049,
            "invoice_id": 231,
            "invoice_item_number": 9,
            "product_id": 21,
            "quantity": 54,
            "cost": 790,
            "discount": 610,
            "self-closing": true
        },
        {
            "item_id": 1050,
            "invoice_id": 232,
            "invoice_item_number": 8,
            "product_id": 18,
            "quantity": 44,
            "cost": 956,
            "discount": 336,
            "self-closing": true
        },
        {
            "item_id": 1051,
            "invoice_id": 65,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 80,
            "cost": 1043,
            "discount": 594,
            "self-closing": true
        },
        {
            "item_id": 1052,
            "invoice_id": 333,
            "invoice_item_number": 9,
            "product_id": 29,
            "quantity": 13,
            "cost": 1412,
            "discount": 56,
            "self-closing": true
        },
        {
            "item_id": 1053,
            "invoice_id": 69,
            "invoice_item_number": 5,
            "product_id": 11,
            "quantity": 56,
            "cost": 1408,
            "discount": 255,
            "self-closing": true
        },
        {
            "item_id": 1054,
            "invoice_id": 147,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 23,
            "cost": 1180,
            "discount": 429,
            "self-closing": true
        },
        {
            "item_id": 1055,
            "invoice_id": 129,
            "invoice_item_number": 7,
            "product_id": 28,
            "quantity": 90,
            "cost": 1113,
            "discount": 608,
            "self-closing": true
        },
        {
            "item_id": 1056,
            "invoice_id": 213,
            "invoice_item_number": 3,
            "product_id": 7,
            "quantity": 24,
            "cost": 410,
            "discount": 994,
            "self-closing": true
        },
        {
            "item_id": 1057,
            "invoice_id": 335,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 79,
            "cost": 1000,
            "discount": 868,
            "self-closing": true
        },
        {
            "item_id": 1058,
            "invoice_id": 151,
            "invoice_item_number": 9,
            "product_id": 26,
            "quantity": 79,
            "cost": 530,
            "discount": 950,
            "self-closing": true
        },
        {
            "item_id": 1059,
            "invoice_id": 231,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 81,
            "cost": 285,
            "discount": 489,
            "self-closing": true
        },
        {
            "item_id": 1060,
            "invoice_id": 109,
            "invoice_item_number": 4,
            "product_id": 29,
            "quantity": 60,
            "cost": 1088,
            "discount": 545,
            "self-closing": true
        },
        {
            "item_id": 1061,
            "invoice_id": 228,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 47,
            "cost": 695,
            "discount": 572,
            "self-closing": true
        },
        {
            "item_id": 1062,
            "invoice_id": 80,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 7,
            "cost": 120,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1063,
            "invoice_id": 275,
            "invoice_item_number": 6,
            "product_id": 18,
            "quantity": 64,
            "cost": 837,
            "discount": 709,
            "self-closing": true
        },
        {
            "item_id": 1064,
            "invoice_id": 349,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 85,
            "cost": 65,
            "discount": 611,
            "self-closing": true
        },
        {
            "item_id": 1065,
            "invoice_id": 98,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 93,
            "cost": 247,
            "discount": 957,
            "self-closing": true
        },
        {
            "item_id": 1066,
            "invoice_id": 208,
            "invoice_item_number": 4,
            "product_id": 17,
            "quantity": 17,
            "cost": 38,
            "discount": 984,
            "self-closing": true
        },
        {
            "item_id": 1067,
            "invoice_id": 394,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 84,
            "cost": 1216,
            "discount": 361,
            "self-closing": true
        },
        {
            "item_id": 1068,
            "invoice_id": 215,
            "invoice_item_number": 5,
            "product_id": 24,
            "quantity": 53,
            "cost": 353,
            "discount": 626,
            "self-closing": true
        },
        {
            "item_id": 1069,
            "invoice_id": 186,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 33,
            "cost": 1234,
            "discount": 494,
            "self-closing": true
        },
        {
            "item_id": 1070,
            "invoice_id": 332,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 72,
            "cost": 272,
            "discount": 831,
            "self-closing": true
        },
        {
            "item_id": 1071,
            "invoice_id": 140,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 21,
            "cost": 705,
            "discount": 851,
            "self-closing": true
        },
        {
            "item_id": 1072,
            "invoice_id": 385,
            "invoice_item_number": 7,
            "product_id": 28,
            "quantity": 19,
            "cost": 1104,
            "discount": 299,
            "self-closing": true
        },
        {
            "item_id": 1073,
            "invoice_id": 249,
            "invoice_item_number": 2,
            "product_id": 26,
            "quantity": 32,
            "cost": 1103,
            "discount": 95,
            "self-closing": true
        },
        {
            "item_id": 1074,
            "invoice_id": 308,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 19,
            "cost": 63,
            "discount": 718,
            "self-closing": true
        },
        {
            "item_id": 1075,
            "invoice_id": 18,
            "invoice_item_number": 6,
            "product_id": 13,
            "quantity": 49,
            "cost": 411,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1076,
            "invoice_id": 357,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 35,
            "cost": 93,
            "discount": 896,
            "self-closing": true
        },
        {
            "item_id": 1077,
            "invoice_id": 277,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 100,
            "cost": 313,
            "discount": 789,
            "self-closing": true
        },
        {
            "item_id": 1078,
            "invoice_id": 320,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 88,
            "cost": 1064,
            "discount": 149,
            "self-closing": true
        },
        {
            "item_id": 1079,
            "invoice_id": 213,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 80,
            "cost": 83,
            "discount": 744,
            "self-closing": true
        },
        {
            "item_id": 1080,
            "invoice_id": 218,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 15,
            "cost": 950,
            "discount": 831,
            "self-closing": true
        },
        {
            "item_id": 1081,
            "invoice_id": 51,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 42,
            "cost": 825,
            "discount": 671,
            "self-closing": true
        },
        {
            "item_id": 1082,
            "invoice_id": 94,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 64,
            "cost": 413,
            "discount": 104,
            "self-closing": true
        },
        {
            "item_id": 1083,
            "invoice_id": 110,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 53,
            "cost": 1075,
            "discount": 632,
            "self-closing": true
        },
        {
            "item_id": 1084,
            "invoice_id": 239,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 82,
            "cost": 365,
            "discount": 917,
            "self-closing": true
        },
        {
            "item_id": 1085,
            "invoice_id": 223,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 95,
            "cost": 1119,
            "discount": 71,
            "self-closing": true
        },
        {
            "item_id": 1086,
            "invoice_id": 282,
            "invoice_item_number": 9,
            "product_id": 5,
            "quantity": 54,
            "cost": 205,
            "discount": 74,
            "self-closing": true
        },
        {
            "item_id": 1087,
            "invoice_id": 109,
            "invoice_item_number": 5,
            "product_id": 28,
            "quantity": 36,
            "cost": 41,
            "discount": 709,
            "self-closing": true
        },
        {
            "item_id": 1088,
            "invoice_id": 244,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 92,
            "cost": 762,
            "discount": 321,
            "self-closing": true
        },
        {
            "item_id": 1089,
            "invoice_id": 319,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 70,
            "cost": 773,
            "discount": 136,
            "self-closing": true
        },
        {
            "item_id": 1090,
            "invoice_id": 355,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 19,
            "cost": 757,
            "discount": 71,
            "self-closing": true
        },
        {
            "item_id": 1091,
            "invoice_id": 80,
            "invoice_item_number": 4,
            "product_id": 13,
            "quantity": 51,
            "cost": 510,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1092,
            "invoice_id": 233,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 76,
            "cost": 878,
            "discount": 790,
            "self-closing": true
        },
        {
            "item_id": 1093,
            "invoice_id": 351,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 60,
            "cost": 1295,
            "discount": 655,
            "self-closing": true
        },
        {
            "item_id": 1094,
            "invoice_id": 234,
            "invoice_item_number": 6,
            "product_id": 17,
            "quantity": 37,
            "cost": 41,
            "discount": 153,
            "self-closing": true
        },
        {
            "item_id": 1095,
            "invoice_id": 390,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 12,
            "cost": 568,
            "discount": 245,
            "self-closing": true
        },
        {
            "item_id": 1096,
            "invoice_id": 397,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 32,
            "cost": 586,
            "discount": 597,
            "self-closing": true
        },
        {
            "item_id": 1097,
            "invoice_id": 89,
            "invoice_item_number": 5,
            "product_id": 4,
            "quantity": 90,
            "cost": 671,
            "discount": 677,
            "self-closing": true
        },
        {
            "item_id": 1098,
            "invoice_id": 20,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 42,
            "cost": 1272,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1099,
            "invoice_id": 380,
            "invoice_item_number": 8,
            "product_id": 20,
            "quantity": 91,
            "cost": 874,
            "discount": 773,
            "self-closing": true
        },
        {
            "item_id": 1100,
            "invoice_id": 287,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 59,
            "cost": 1001,
            "discount": 231,
            "self-closing": true
        },
        {
            "item_id": 1101,
            "invoice_id": 34,
            "invoice_item_number": 6,
            "product_id": 24,
            "quantity": 16,
            "cost": 550,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1102,
            "invoice_id": 56,
            "invoice_item_number": 7,
            "product_id": 6,
            "quantity": 72,
            "cost": 108,
            "discount": 907,
            "self-closing": true
        },
        {
            "item_id": 1103,
            "invoice_id": 80,
            "invoice_item_number": 1,
            "product_id": 23,
            "quantity": 70,
            "cost": 730,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1104,
            "invoice_id": 123,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 62,
            "cost": 51,
            "discount": 735,
            "self-closing": true
        },
        {
            "item_id": 1105,
            "invoice_id": 175,
            "invoice_item_number": 8,
            "product_id": 16,
            "quantity": 47,
            "cost": 52,
            "discount": 991,
            "self-closing": true
        },
        {
            "item_id": 1106,
            "invoice_id": 355,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 13,
            "cost": 779,
            "discount": 656,
            "self-closing": true
        },
        {
            "item_id": 1107,
            "invoice_id": 143,
            "invoice_item_number": 3,
            "product_id": 19,
            "quantity": 32,
            "cost": 877,
            "discount": 495,
            "self-closing": true
        },
        {
            "item_id": 1108,
            "invoice_id": 151,
            "invoice_item_number": 5,
            "product_id": 2,
            "quantity": 46,
            "cost": 1284,
            "discount": 630,
            "self-closing": true
        },
        {
            "item_id": 1109,
            "invoice_id": 175,
            "invoice_item_number": 7,
            "product_id": 4,
            "quantity": 88,
            "cost": 1005,
            "discount": 527,
            "self-closing": true
        },
        {
            "item_id": 1110,
            "invoice_id": 80,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 15,
            "cost": 150,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1111,
            "invoice_id": 80,
            "invoice_item_number": 2,
            "product_id": 8,
            "quantity": 50,
            "cost": 500,
            "discount": 18,
            "self-closing": true
        },
        {
            "item_id": 1112,
            "invoice_id": 392,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 44,
            "cost": 815,
            "discount": 627,
            "self-closing": true
        },
        {
            "item_id": 1113,
            "invoice_id": 257,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 91,
            "cost": 500,
            "discount": 443,
            "self-closing": true
        },
        {
            "item_id": 1114,
            "invoice_id": 64,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 56,
            "cost": 537,
            "discount": 731,
            "self-closing": true
        },
        {
            "item_id": 1115,
            "invoice_id": 183,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 83,
            "cost": 546,
            "discount": 158,
            "self-closing": true
        },
        {
            "item_id": 1116,
            "invoice_id": 260,
            "invoice_item_number": 8,
            "product_id": 18,
            "quantity": 16,
            "cost": 741,
            "discount": 327,
            "self-closing": true
        },
        {
            "item_id": 1117,
            "invoice_id": 339,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 23,
            "cost": 862,
            "discount": 911,
            "self-closing": true
        },
        {
            "item_id": 1118,
            "invoice_id": 91,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 73,
            "cost": 343,
            "discount": 25,
            "self-closing": true
        },
        {
            "item_id": 1119,
            "invoice_id": 378,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 96,
            "cost": 322,
            "discount": 754,
            "self-closing": true
        },
        {
            "item_id": 1120,
            "invoice_id": 233,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 46,
            "cost": 1049,
            "discount": 794,
            "self-closing": true
        },
        {
            "item_id": 1121,
            "invoice_id": 299,
            "invoice_item_number": 1,
            "product_id": 8,
            "quantity": 56,
            "cost": 823,
            "discount": 821,
            "self-closing": true
        },
        {
            "item_id": 1122,
            "invoice_id": 360,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 57,
            "cost": 64,
            "discount": 39,
            "self-closing": true
        },
        {
            "item_id": 1123,
            "invoice_id": 349,
            "invoice_item_number": 5,
            "product_id": 4,
            "quantity": 61,
            "cost": 1198,
            "discount": 986,
            "self-closing": true
        },
        {
            "item_id": 1124,
            "invoice_id": 117,
            "invoice_item_number": 7,
            "product_id": 4,
            "quantity": 93,
            "cost": 1194,
            "discount": 328,
            "self-closing": true
        },
        {
            "item_id": 1125,
            "invoice_id": 68,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 100,
            "cost": 635,
            "discount": 543,
            "self-closing": true
        },
        {
            "item_id": 1126,
            "invoice_id": 28,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 96,
            "cost": 342,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1127,
            "invoice_id": 387,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 63,
            "cost": 1372,
            "discount": 365,
            "self-closing": true
        },
        {
            "item_id": 1128,
            "invoice_id": 95,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 85,
            "cost": 566,
            "discount": 211,
            "self-closing": true
        },
        {
            "item_id": 1129,
            "invoice_id": 38,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 83,
            "cost": 1336,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1130,
            "invoice_id": 32,
            "invoice_item_number": 4,
            "product_id": 10,
            "quantity": 65,
            "cost": 1088,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1131,
            "invoice_id": 146,
            "invoice_item_number": 7,
            "product_id": 5,
            "quantity": 97,
            "cost": 1074,
            "discount": 261,
            "self-closing": true
        },
        {
            "item_id": 1132,
            "invoice_id": 81,
            "invoice_item_number": 8,
            "product_id": 24,
            "quantity": 99,
            "cost": 990,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1133,
            "invoice_id": 81,
            "invoice_item_number": 7,
            "product_id": 23,
            "quantity": 40,
            "cost": 400,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1134,
            "invoice_id": 303,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 40,
            "cost": 836,
            "discount": 559,
            "self-closing": true
        },
        {
            "item_id": 1135,
            "invoice_id": 136,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 84,
            "cost": 210,
            "discount": 73,
            "self-closing": true
        },
        {
            "item_id": 1136,
            "invoice_id": 17,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 32,
            "cost": 437,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1137,
            "invoice_id": 282,
            "invoice_item_number": 4,
            "product_id": 18,
            "quantity": 65,
            "cost": 1488,
            "discount": 454,
            "self-closing": true
        },
        {
            "item_id": 1138,
            "invoice_id": 224,
            "invoice_item_number": 8,
            "product_id": 13,
            "quantity": 60,
            "cost": 530,
            "discount": 975,
            "self-closing": true
        },
        {
            "item_id": 1139,
            "invoice_id": 138,
            "invoice_item_number": 9,
            "product_id": 8,
            "quantity": 26,
            "cost": 281,
            "discount": 869,
            "self-closing": true
        },
        {
            "item_id": 1140,
            "invoice_id": 73,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 58,
            "cost": 959,
            "discount": 958,
            "self-closing": true
        },
        {
            "item_id": 1141,
            "invoice_id": 13,
            "invoice_item_number": 2,
            "product_id": 20,
            "quantity": 20,
            "cost": 497,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1142,
            "invoice_id": 240,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 19,
            "cost": 75,
            "discount": 81,
            "self-closing": true
        },
        {
            "item_id": 1143,
            "invoice_id": 226,
            "invoice_item_number": 7,
            "product_id": 9,
            "quantity": 64,
            "cost": 1359,
            "discount": 158,
            "self-closing": true
        },
        {
            "item_id": 1144,
            "invoice_id": 81,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 5,
            "cost": 15,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1145,
            "invoice_id": 150,
            "invoice_item_number": 5,
            "product_id": 24,
            "quantity": 29,
            "cost": 983,
            "discount": 306,
            "self-closing": true
        },
        {
            "item_id": 1146,
            "invoice_id": 346,
            "invoice_item_number": 9,
            "product_id": 30,
            "quantity": 73,
            "cost": 200,
            "discount": 643,
            "self-closing": true
        },
        {
            "item_id": 1147,
            "invoice_id": 111,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 39,
            "cost": 59,
            "discount": 191,
            "self-closing": true
        },
        {
            "item_id": 1148,
            "invoice_id": 171,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 45,
            "cost": 146,
            "discount": 765,
            "self-closing": true
        },
        {
            "item_id": 1149,
            "invoice_id": 201,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 10,
            "cost": 180,
            "discount": 143,
            "self-closing": true
        },
        {
            "item_id": 1150,
            "invoice_id": 64,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 53,
            "cost": 156,
            "discount": 604,
            "self-closing": true
        },
        {
            "item_id": 1151,
            "invoice_id": 178,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 40,
            "cost": 1392,
            "discount": 278,
            "self-closing": true
        },
        {
            "item_id": 1152,
            "invoice_id": 178,
            "invoice_item_number": 6,
            "product_id": 22,
            "quantity": 78,
            "cost": 779,
            "discount": 97,
            "self-closing": true
        },
        {
            "item_id": 1153,
            "invoice_id": 32,
            "invoice_item_number": 5,
            "product_id": 7,
            "quantity": 56,
            "cost": 877,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1154,
            "invoice_id": 300,
            "invoice_item_number": 5,
            "product_id": 13,
            "quantity": 18,
            "cost": 994,
            "discount": 497,
            "self-closing": true
        },
        {
            "item_id": 1155,
            "invoice_id": 255,
            "invoice_item_number": 4,
            "product_id": 17,
            "quantity": 61,
            "cost": 1231,
            "discount": 71,
            "self-closing": true
        },
        {
            "item_id": 1156,
            "invoice_id": 165,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 52,
            "cost": 943,
            "discount": 784,
            "self-closing": true
        },
        {
            "item_id": 1157,
            "invoice_id": 167,
            "invoice_item_number": 8,
            "product_id": 2,
            "quantity": 41,
            "cost": 697,
            "discount": 558,
            "self-closing": true
        },
        {
            "item_id": 1158,
            "invoice_id": 12,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 59,
            "cost": 1349,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1159,
            "invoice_id": 323,
            "invoice_item_number": 5,
            "product_id": 9,
            "quantity": 27,
            "cost": 890,
            "discount": 227,
            "self-closing": true
        },
        {
            "item_id": 1160,
            "invoice_id": 1,
            "invoice_item_number": 4,
            "product_id": 29,
            "quantity": 76,
            "cost": 1439,
            "discount": 692,
            "self-closing": true
        },
        {
            "item_id": 1161,
            "invoice_id": 217,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 80,
            "cost": 1115,
            "discount": 386,
            "self-closing": true
        },
        {
            "item_id": 1162,
            "invoice_id": 128,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 96,
            "cost": 1278,
            "discount": 866,
            "self-closing": true
        },
        {
            "item_id": 1163,
            "invoice_id": 64,
            "invoice_item_number": 6,
            "product_id": 16,
            "quantity": 100,
            "cost": 568,
            "discount": 710,
            "self-closing": true
        },
        {
            "item_id": 1164,
            "invoice_id": 334,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 85,
            "cost": 196,
            "discount": 679,
            "self-closing": true
        },
        {
            "item_id": 1165,
            "invoice_id": 302,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 31,
            "cost": 349,
            "discount": 844,
            "self-closing": true
        },
        {
            "item_id": 1166,
            "invoice_id": 307,
            "invoice_item_number": 8,
            "product_id": 14,
            "quantity": 81,
            "cost": 381,
            "discount": 213,
            "self-closing": true
        },
        {
            "item_id": 1167,
            "invoice_id": 36,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 49,
            "cost": 540,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1168,
            "invoice_id": 188,
            "invoice_item_number": 6,
            "product_id": 13,
            "quantity": 51,
            "cost": 612,
            "discount": 158,
            "self-closing": true
        },
        {
            "item_id": 1169,
            "invoice_id": 35,
            "invoice_item_number": 4,
            "product_id": 21,
            "quantity": 96,
            "cost": 252,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1170,
            "invoice_id": 188,
            "invoice_item_number": 4,
            "product_id": 18,
            "quantity": 100,
            "cost": 1483,
            "discount": 815,
            "self-closing": true
        },
        {
            "item_id": 1171,
            "invoice_id": 258,
            "invoice_item_number": 9,
            "product_id": 9,
            "quantity": 14,
            "cost": 743,
            "discount": 428,
            "self-closing": true
        },
        {
            "item_id": 1172,
            "invoice_id": 81,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 170,
            "cost": 19002,
            "discount": 34,
            "self-closing": true
        },
        {
            "item_id": 1173,
            "invoice_id": 277,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 43,
            "cost": 1069,
            "discount": 627,
            "self-closing": true
        },
        {
            "item_id": 1174,
            "invoice_id": 191,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 73,
            "cost": 1360,
            "discount": 430,
            "self-closing": true
        },
        {
            "item_id": 1175,
            "invoice_id": 306,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 64,
            "cost": 606,
            "discount": 162,
            "self-closing": true
        },
        {
            "item_id": 1176,
            "invoice_id": 19,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 37,
            "cost": 1010,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1177,
            "invoice_id": 200,
            "invoice_item_number": 4,
            "product_id": 1,
            "quantity": 40,
            "cost": 922,
            "discount": 423,
            "self-closing": true
        },
        {
            "item_id": 1178,
            "invoice_id": 310,
            "invoice_item_number": 7,
            "product_id": 17,
            "quantity": 56,
            "cost": 522,
            "discount": 616,
            "self-closing": true
        },
        {
            "item_id": 1179,
            "invoice_id": 276,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 31,
            "cost": 1142,
            "discount": 528,
            "self-closing": true
        },
        {
            "item_id": 1180,
            "invoice_id": 71,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 54,
            "cost": 993,
            "discount": 805,
            "self-closing": true
        },
        {
            "item_id": 1181,
            "invoice_id": 176,
            "invoice_item_number": 9,
            "product_id": 9,
            "quantity": 13,
            "cost": 108,
            "discount": 345,
            "self-closing": true
        },
        {
            "item_id": 1182,
            "invoice_id": 254,
            "invoice_item_number": 5,
            "product_id": 25,
            "quantity": 77,
            "cost": 330,
            "discount": 50,
            "self-closing": true
        },
        {
            "item_id": 1183,
            "invoice_id": 150,
            "invoice_item_number": 7,
            "product_id": 21,
            "quantity": 58,
            "cost": 1381,
            "discount": 509,
            "self-closing": true
        },
        {
            "item_id": 1184,
            "invoice_id": 60,
            "invoice_item_number": 8,
            "product_id": 2,
            "quantity": 68,
            "cost": 374,
            "discount": 120,
            "self-closing": true
        },
        {
            "item_id": 1185,
            "invoice_id": 165,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 51,
            "cost": 1268,
            "discount": 251,
            "self-closing": true
        },
        {
            "item_id": 1186,
            "invoice_id": 375,
            "invoice_item_number": 8,
            "product_id": 5,
            "quantity": 78,
            "cost": 1112,
            "discount": 945,
            "self-closing": true
        },
        {
            "item_id": 1187,
            "invoice_id": 81,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 117,
            "cost": 10004,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1188,
            "invoice_id": 300,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 97,
            "cost": 1463,
            "discount": 831,
            "self-closing": true
        },
        {
            "item_id": 1189,
            "invoice_id": 141,
            "invoice_item_number": 4,
            "product_id": 7,
            "quantity": 78,
            "cost": 1046,
            "discount": 288,
            "self-closing": true
        },
        {
            "item_id": 1190,
            "invoice_id": 85,
            "invoice_item_number": 6,
            "product_id": 28,
            "quantity": 94,
            "cost": 638,
            "discount": 331,
            "self-closing": true
        },
        {
            "item_id": 1191,
            "invoice_id": 342,
            "invoice_item_number": 7,
            "product_id": 5,
            "quantity": 29,
            "cost": 345,
            "discount": 218,
            "self-closing": true
        },
        {
            "item_id": 1192,
            "invoice_id": 249,
            "invoice_item_number": 1,
            "product_id": 28,
            "quantity": 83,
            "cost": 250,
            "discount": 136,
            "self-closing": true
        },
        {
            "item_id": 1193,
            "invoice_id": 281,
            "invoice_item_number": 6,
            "product_id": 7,
            "quantity": 30,
            "cost": 491,
            "discount": 221,
            "self-closing": true
        },
        {
            "item_id": 1194,
            "invoice_id": 370,
            "invoice_item_number": 5,
            "product_id": 20,
            "quantity": 55,
            "cost": 797,
            "discount": 702,
            "self-closing": true
        },
        {
            "item_id": 1195,
            "invoice_id": 165,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 63,
            "cost": 124,
            "discount": 177,
            "self-closing": true
        },
        {
            "item_id": 1196,
            "invoice_id": 358,
            "invoice_item_number": 4,
            "product_id": 10,
            "quantity": 54,
            "cost": 1128,
            "discount": 796,
            "self-closing": true
        },
        {
            "item_id": 1197,
            "invoice_id": 27,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 23,
            "cost": 427,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1198,
            "invoice_id": 303,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 81,
            "cost": 1169,
            "discount": 194,
            "self-closing": true
        },
        {
            "item_id": 1199,
            "invoice_id": 217,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 76,
            "cost": 972,
            "discount": 643,
            "self-closing": true
        },
        {
            "item_id": 1200,
            "invoice_id": 267,
            "invoice_item_number": 9,
            "product_id": 4,
            "quantity": 53,
            "cost": 323,
            "discount": 252,
            "self-closing": true
        },
        {
            "item_id": 1201,
            "invoice_id": 209,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 30,
            "cost": 380,
            "discount": 569,
            "self-closing": true
        },
        {
            "item_id": 1202,
            "invoice_id": 331,
            "invoice_item_number": 9,
            "product_id": 4,
            "quantity": 81,
            "cost": 421,
            "discount": 138,
            "self-closing": true
        },
        {
            "item_id": 1203,
            "invoice_id": 398,
            "invoice_item_number": 9,
            "product_id": 3,
            "quantity": 41,
            "cost": 890,
            "discount": 717,
            "self-closing": true
        },
        {
            "item_id": 1204,
            "invoice_id": 81,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 141,
            "cost": 12000,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1205,
            "invoice_id": 143,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 15,
            "cost": 1140,
            "discount": 227,
            "self-closing": true
        },
        {
            "item_id": 1206,
            "invoice_id": 388,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 66,
            "cost": 624,
            "discount": 867,
            "self-closing": true
        },
        {
            "item_id": 1207,
            "invoice_id": 105,
            "invoice_item_number": 9,
            "product_id": 5,
            "quantity": 61,
            "cost": 696,
            "discount": 702,
            "self-closing": true
        },
        {
            "item_id": 1208,
            "invoice_id": 65,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 81,
            "cost": 1295,
            "discount": 572,
            "self-closing": true
        },
        {
            "item_id": 1209,
            "invoice_id": 335,
            "invoice_item_number": 7,
            "product_id": 4,
            "quantity": 71,
            "cost": 1171,
            "discount": 507,
            "self-closing": true
        },
        {
            "item_id": 1210,
            "invoice_id": 72,
            "invoice_item_number": 9,
            "product_id": 15,
            "quantity": 85,
            "cost": 781,
            "discount": 795,
            "self-closing": true
        },
        {
            "item_id": 1211,
            "invoice_id": 137,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 14,
            "cost": 673,
            "discount": 439,
            "self-closing": true
        },
        {
            "item_id": 1212,
            "invoice_id": 152,
            "invoice_item_number": 5,
            "product_id": 16,
            "quantity": 81,
            "cost": 1163,
            "discount": 48,
            "self-closing": true
        },
        {
            "item_id": 1213,
            "invoice_id": 314,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 24,
            "cost": 761,
            "discount": 917,
            "self-closing": true
        },
        {
            "item_id": 1214,
            "invoice_id": 120,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 92,
            "cost": 458,
            "discount": 987,
            "self-closing": true
        },
        {
            "item_id": 1215,
            "invoice_id": 85,
            "invoice_item_number": 7,
            "product_id": 4,
            "quantity": 75,
            "cost": 486,
            "discount": 180,
            "self-closing": true
        },
        {
            "item_id": 1216,
            "invoice_id": 276,
            "invoice_item_number": 6,
            "product_id": 18,
            "quantity": 63,
            "cost": 702,
            "discount": 609,
            "self-closing": true
        },
        {
            "item_id": 1217,
            "invoice_id": 173,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 75,
            "cost": 507,
            "discount": 348,
            "self-closing": true
        },
        {
            "item_id": 1218,
            "invoice_id": 123,
            "invoice_item_number": 6,
            "product_id": 19,
            "quantity": 97,
            "cost": 169,
            "discount": 520,
            "self-closing": true
        },
        {
            "item_id": 1219,
            "invoice_id": 179,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 80,
            "cost": 1479,
            "discount": 102,
            "self-closing": true
        },
        {
            "item_id": 1220,
            "invoice_id": 349,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 25,
            "cost": 1178,
            "discount": 414,
            "self-closing": true
        },
        {
            "item_id": 1221,
            "invoice_id": 183,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 45,
            "cost": 1487,
            "discount": 983,
            "self-closing": true
        },
        {
            "item_id": 1222,
            "invoice_id": 12,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 31,
            "cost": 597,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1223,
            "invoice_id": 183,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 35,
            "cost": 669,
            "discount": 615,
            "self-closing": true
        },
        {
            "item_id": 1224,
            "invoice_id": 197,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 30,
            "cost": 799,
            "discount": 625,
            "self-closing": true
        },
        {
            "item_id": 1225,
            "invoice_id": 329,
            "invoice_item_number": 7,
            "product_id": 29,
            "quantity": 41,
            "cost": 574,
            "discount": 81,
            "self-closing": true
        },
        {
            "item_id": 1226,
            "invoice_id": 278,
            "invoice_item_number": 5,
            "product_id": 20,
            "quantity": 48,
            "cost": 1463,
            "discount": 263,
            "self-closing": true
        },
        {
            "item_id": 1227,
            "invoice_id": 1,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 42,
            "cost": 1002,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1228,
            "invoice_id": 249,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 68,
            "cost": 1323,
            "discount": 460,
            "self-closing": true
        },
        {
            "item_id": 1229,
            "invoice_id": 153,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 21,
            "cost": 578,
            "discount": 468,
            "self-closing": true
        },
        {
            "item_id": 1230,
            "invoice_id": 283,
            "invoice_item_number": 2,
            "product_id": 24,
            "quantity": 19,
            "cost": 157,
            "discount": 58,
            "self-closing": true
        },
        {
            "item_id": 1231,
            "invoice_id": 230,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 45,
            "cost": 903,
            "discount": 939,
            "self-closing": true
        },
        {
            "item_id": 1232,
            "invoice_id": 23,
            "invoice_item_number": 7,
            "product_id": 19,
            "quantity": 44,
            "cost": 343,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1233,
            "invoice_id": 362,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 107,
            "cost": 10700,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1234,
            "invoice_id": 357,
            "invoice_item_number": 2,
            "product_id": 30,
            "quantity": 59,
            "cost": 208,
            "discount": 426,
            "self-closing": true
        },
        {
            "item_id": 1235,
            "invoice_id": 153,
            "invoice_item_number": 7,
            "product_id": 5,
            "quantity": 25,
            "cost": 791,
            "discount": 88,
            "self-closing": true
        },
        {
            "item_id": 1236,
            "invoice_id": 240,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 55,
            "cost": 1442,
            "discount": 796,
            "self-closing": true
        },
        {
            "item_id": 1237,
            "invoice_id": 276,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 96,
            "cost": 692,
            "discount": 293,
            "self-closing": true
        },
        {
            "item_id": 1238,
            "invoice_id": 129,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 73,
            "cost": 1233,
            "discount": 995,
            "self-closing": true
        },
        {
            "item_id": 1239,
            "invoice_id": 9,
            "invoice_item_number": 5,
            "product_id": 11,
            "quantity": 28,
            "cost": 1174,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1240,
            "invoice_id": 13,
            "invoice_item_number": 4,
            "product_id": 10,
            "quantity": 99,
            "cost": 450,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1241,
            "invoice_id": 34,
            "invoice_item_number": 9,
            "product_id": 20,
            "quantity": 52,
            "cost": 1178,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1242,
            "invoice_id": 104,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 53,
            "cost": 1220,
            "discount": 347,
            "self-closing": true
        },
        {
            "item_id": 1243,
            "invoice_id": 81,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 114,
            "cost": 150,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1244,
            "invoice_id": 148,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 80,
            "cost": 1146,
            "discount": 934,
            "self-closing": true
        },
        {
            "item_id": 1245,
            "invoice_id": 114,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 22,
            "cost": 592,
            "discount": 605,
            "self-closing": true
        },
        {
            "item_id": 1246,
            "invoice_id": 308,
            "invoice_item_number": 5,
            "product_id": 4,
            "quantity": 74,
            "cost": 915,
            "discount": 991,
            "self-closing": true
        },
        {
            "item_id": 1247,
            "invoice_id": 271,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 82,
            "cost": 1474,
            "discount": 799,
            "self-closing": true
        },
        {
            "item_id": 1248,
            "invoice_id": 312,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 79,
            "cost": 101,
            "discount": 291,
            "self-closing": true
        },
        {
            "item_id": 1249,
            "invoice_id": 212,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 59,
            "cost": 1307,
            "discount": 29,
            "self-closing": true
        },
        {
            "item_id": 1250,
            "invoice_id": 185,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 16,
            "cost": 1373,
            "discount": 162,
            "self-closing": true
        },
        {
            "item_id": 1251,
            "invoice_id": 60,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 97,
            "cost": 1488,
            "discount": 617,
            "self-closing": true
        },
        {
            "item_id": 1252,
            "invoice_id": 10,
            "invoice_item_number": 1,
            "product_id": 6,
            "quantity": 93,
            "cost": 811,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1253,
            "invoice_id": 226,
            "invoice_item_number": 8,
            "product_id": 7,
            "quantity": 68,
            "cost": 491,
            "discount": 770,
            "self-closing": true
        },
        {
            "item_id": 1254,
            "invoice_id": 7,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 84,
            "cost": 652,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1255,
            "invoice_id": 286,
            "invoice_item_number": 9,
            "product_id": 21,
            "quantity": 34,
            "cost": 518,
            "discount": 246,
            "self-closing": true
        },
        {
            "item_id": 1256,
            "invoice_id": 21,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 54,
            "cost": 747,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1257,
            "invoice_id": 185,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 10,
            "cost": 662,
            "discount": 194,
            "self-closing": true
        },
        {
            "item_id": 1258,
            "invoice_id": 162,
            "invoice_item_number": 7,
            "product_id": 15,
            "quantity": 53,
            "cost": 1067,
            "discount": 634,
            "self-closing": true
        },
        {
            "item_id": 1259,
            "invoice_id": 167,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 82,
            "cost": 1151,
            "discount": 290,
            "self-closing": true
        },
        {
            "item_id": 1260,
            "invoice_id": 383,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 84,
            "cost": 154,
            "discount": 666,
            "self-closing": true
        },
        {
            "item_id": 1261,
            "invoice_id": 387,
            "invoice_item_number": 2,
            "product_id": 28,
            "quantity": 31,
            "cost": 283,
            "discount": 347,
            "self-closing": true
        },
        {
            "item_id": 1262,
            "invoice_id": 374,
            "invoice_item_number": 9,
            "product_id": 13,
            "quantity": 74,
            "cost": 452,
            "discount": 207,
            "self-closing": true
        },
        {
            "item_id": 1263,
            "invoice_id": 81,
            "invoice_item_number": 1,
            "product_id": 30,
            "quantity": 18,
            "cost": 190,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1264,
            "invoice_id": 273,
            "invoice_item_number": 5,
            "product_id": 9,
            "quantity": 69,
            "cost": 481,
            "discount": 571,
            "self-closing": true
        },
        {
            "item_id": 1265,
            "invoice_id": 299,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 20,
            "cost": 140,
            "discount": 585,
            "self-closing": true
        },
        {
            "item_id": 1266,
            "invoice_id": 397,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 53,
            "cost": 390,
            "discount": 173,
            "self-closing": true
        },
        {
            "item_id": 1267,
            "invoice_id": 82,
            "invoice_item_number": 8,
            "product_id": 15,
            "quantity": 141,
            "cost": 1410,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1268,
            "invoice_id": 104,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 43,
            "cost": 215,
            "discount": 650,
            "self-closing": true
        },
        {
            "item_id": 1269,
            "invoice_id": 67,
            "invoice_item_number": 7,
            "product_id": 8,
            "quantity": 38,
            "cost": 964,
            "discount": 914,
            "self-closing": true
        },
        {
            "item_id": 1270,
            "invoice_id": 299,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 27,
            "cost": 797,
            "discount": 712,
            "self-closing": true
        },
        {
            "item_id": 1271,
            "invoice_id": 373,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 57,
            "cost": 934,
            "discount": 240,
            "self-closing": true
        },
        {
            "item_id": 1272,
            "invoice_id": 255,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 27,
            "cost": 1094,
            "discount": 210,
            "self-closing": true
        },
        {
            "item_id": 1273,
            "invoice_id": 170,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 34,
            "cost": 419,
            "discount": 813,
            "self-closing": true
        },
        {
            "item_id": 1274,
            "invoice_id": 118,
            "invoice_item_number": 7,
            "product_id": 22,
            "quantity": 18,
            "cost": 1040,
            "discount": 615,
            "self-closing": true
        },
        {
            "item_id": 1275,
            "invoice_id": 25,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 78,
            "cost": 611,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1276,
            "invoice_id": 54,
            "invoice_item_number": 7,
            "product_id": 21,
            "quantity": 70,
            "cost": 119,
            "discount": 109,
            "self-closing": true
        },
        {
            "item_id": 1277,
            "invoice_id": 82,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 41,
            "cost": 410,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1278,
            "invoice_id": 82,
            "invoice_item_number": 6,
            "product_id": 30,
            "quantity": 4,
            "cost": 45,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1279,
            "invoice_id": 207,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 97,
            "cost": 777,
            "discount": 451,
            "self-closing": true
        },
        {
            "item_id": 1280,
            "invoice_id": 125,
            "invoice_item_number": 7,
            "product_id": 16,
            "quantity": 89,
            "cost": 283,
            "discount": 537,
            "self-closing": true
        },
        {
            "item_id": 1281,
            "invoice_id": 221,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 61,
            "cost": 1211,
            "discount": 565,
            "self-closing": true
        },
        {
            "item_id": 1282,
            "invoice_id": 14,
            "invoice_item_number": 4,
            "product_id": 14,
            "quantity": 52,
            "cost": 1195,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1283,
            "invoice_id": 216,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 26,
            "cost": 301,
            "discount": 587,
            "self-closing": true
        },
        {
            "item_id": 1284,
            "invoice_id": 64,
            "invoice_item_number": 3,
            "product_id": 25,
            "quantity": 100,
            "cost": 91,
            "discount": 570,
            "self-closing": true
        },
        {
            "item_id": 1285,
            "invoice_id": 275,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 49,
            "cost": 365,
            "discount": 317,
            "self-closing": true
        },
        {
            "item_id": 1286,
            "invoice_id": 148,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 21,
            "cost": 1490,
            "discount": 571,
            "self-closing": true
        },
        {
            "item_id": 1287,
            "invoice_id": 21,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 88,
            "cost": 841,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1288,
            "invoice_id": 82,
            "invoice_item_number": 5,
            "product_id": 25,
            "quantity": 87,
            "cost": 890,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1289,
            "invoice_id": 187,
            "invoice_item_number": 4,
            "product_id": 2,
            "quantity": 58,
            "cost": 1363,
            "discount": 288,
            "self-closing": true
        },
        {
            "item_id": 1290,
            "invoice_id": 315,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 94,
            "cost": 77,
            "discount": 423,
            "self-closing": true
        },
        {
            "item_id": 1291,
            "invoice_id": 381,
            "invoice_item_number": 6,
            "product_id": 23,
            "quantity": 16,
            "cost": 494,
            "discount": 836,
            "self-closing": true
        },
        {
            "item_id": 1292,
            "invoice_id": 162,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 59,
            "cost": 1238,
            "discount": 468,
            "self-closing": true
        },
        {
            "item_id": 1293,
            "invoice_id": 318,
            "invoice_item_number": 2,
            "product_id": 7,
            "quantity": 88,
            "cost": 475,
            "discount": 799,
            "self-closing": true
        },
        {
            "item_id": 1294,
            "invoice_id": 56,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 21,
            "cost": 783,
            "discount": 971,
            "self-closing": true
        },
        {
            "item_id": 1295,
            "invoice_id": 202,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 11,
            "cost": 1069,
            "discount": 121,
            "self-closing": true
        },
        {
            "item_id": 1296,
            "invoice_id": 288,
            "invoice_item_number": 4,
            "product_id": 2,
            "quantity": 41,
            "cost": 466,
            "discount": 291,
            "self-closing": true
        },
        {
            "item_id": 1297,
            "invoice_id": 347,
            "invoice_item_number": 4,
            "product_id": 21,
            "quantity": 30,
            "cost": 847,
            "discount": 580,
            "self-closing": true
        },
        {
            "item_id": 1298,
            "invoice_id": 147,
            "invoice_item_number": 4,
            "product_id": 12,
            "quantity": 61,
            "cost": 585,
            "discount": 39,
            "self-closing": true
        },
        {
            "item_id": 1299,
            "invoice_id": 151,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 31,
            "cost": 942,
            "discount": 674,
            "self-closing": true
        },
        {
            "item_id": 1300,
            "invoice_id": 121,
            "invoice_item_number": 4,
            "product_id": 17,
            "quantity": 47,
            "cost": 938,
            "discount": 662,
            "self-closing": true
        },
        {
            "item_id": 1301,
            "invoice_id": 36,
            "invoice_item_number": 6,
            "product_id": 28,
            "quantity": 96,
            "cost": 156,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1302,
            "invoice_id": 73,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 78,
            "cost": 732,
            "discount": 846,
            "self-closing": true
        },
        {
            "item_id": 1303,
            "invoice_id": 11,
            "invoice_item_number": 1,
            "product_id": 14,
            "quantity": 37,
            "cost": 407,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1304,
            "invoice_id": 58,
            "invoice_item_number": 6,
            "product_id": 25,
            "quantity": 49,
            "cost": 354,
            "discount": 114,
            "self-closing": true
        },
        {
            "item_id": 1305,
            "invoice_id": 63,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 31,
            "cost": 724,
            "discount": 645,
            "self-closing": true
        },
        {
            "item_id": 1306,
            "invoice_id": 101,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 49,
            "cost": 939,
            "discount": 976,
            "self-closing": true
        },
        {
            "item_id": 1307,
            "invoice_id": 152,
            "invoice_item_number": 9,
            "product_id": 30,
            "quantity": 27,
            "cost": 1350,
            "discount": 463,
            "self-closing": true
        },
        {
            "item_id": 1308,
            "invoice_id": 152,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 99,
            "cost": 148,
            "discount": 870,
            "self-closing": true
        },
        {
            "item_id": 1309,
            "invoice_id": 208,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 88,
            "cost": 1342,
            "discount": 450,
            "self-closing": true
        },
        {
            "item_id": 1310,
            "invoice_id": 146,
            "invoice_item_number": 5,
            "product_id": 19,
            "quantity": 30,
            "cost": 1494,
            "discount": 250,
            "self-closing": true
        },
        {
            "item_id": 1311,
            "invoice_id": 263,
            "invoice_item_number": 8,
            "product_id": 6,
            "quantity": 99,
            "cost": 1139,
            "discount": 776,
            "self-closing": true
        },
        {
            "item_id": 1312,
            "invoice_id": 381,
            "invoice_item_number": 8,
            "product_id": 8,
            "quantity": 18,
            "cost": 227,
            "discount": 545,
            "self-closing": true
        },
        {
            "item_id": 1313,
            "invoice_id": 100,
            "invoice_item_number": 6,
            "product_id": 18,
            "quantity": 57,
            "cost": 889,
            "discount": 276,
            "self-closing": true
        },
        {
            "item_id": 1314,
            "invoice_id": 278,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 59,
            "cost": 823,
            "discount": 989,
            "self-closing": true
        },
        {
            "item_id": 1315,
            "invoice_id": 267,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 29,
            "cost": 559,
            "discount": 167,
            "self-closing": true
        },
        {
            "item_id": 1316,
            "invoice_id": 21,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 79,
            "cost": 147,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1317,
            "invoice_id": 124,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 92,
            "cost": 1104,
            "discount": 727,
            "self-closing": true
        },
        {
            "item_id": 1318,
            "invoice_id": 209,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 50,
            "cost": 100,
            "discount": 776,
            "self-closing": true
        },
        {
            "item_id": 1319,
            "invoice_id": 115,
            "invoice_item_number": 7,
            "product_id": 21,
            "quantity": 74,
            "cost": 1059,
            "discount": 397,
            "self-closing": true
        },
        {
            "item_id": 1320,
            "invoice_id": 119,
            "invoice_item_number": 3,
            "product_id": 15,
            "quantity": 84,
            "cost": 837,
            "discount": 587,
            "self-closing": true
        },
        {
            "item_id": 1321,
            "invoice_id": 242,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 76,
            "cost": 131,
            "discount": 746,
            "self-closing": true
        },
        {
            "item_id": 1322,
            "invoice_id": 219,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 72,
            "cost": 472,
            "discount": 100,
            "self-closing": true
        },
        {
            "item_id": 1323,
            "invoice_id": 341,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 81,
            "cost": 1104,
            "discount": 939,
            "self-closing": true
        },
        {
            "item_id": 1324,
            "invoice_id": 112,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 62,
            "cost": 408,
            "discount": 340,
            "self-closing": true
        },
        {
            "item_id": 1325,
            "invoice_id": 67,
            "invoice_item_number": 9,
            "product_id": 29,
            "quantity": 72,
            "cost": 808,
            "discount": 461,
            "self-closing": true
        },
        {
            "item_id": 1326,
            "invoice_id": 283,
            "invoice_item_number": 9,
            "product_id": 4,
            "quantity": 78,
            "cost": 59,
            "discount": 183,
            "self-closing": true
        },
        {
            "item_id": 1327,
            "invoice_id": 29,
            "invoice_item_number": 6,
            "product_id": 7,
            "quantity": 52,
            "cost": 531,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1328,
            "invoice_id": 64,
            "invoice_item_number": 7,
            "product_id": 5,
            "quantity": 22,
            "cost": 264,
            "discount": 403,
            "self-closing": true
        },
        {
            "item_id": 1329,
            "invoice_id": 109,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 38,
            "cost": 637,
            "discount": 724,
            "self-closing": true
        },
        {
            "item_id": 1330,
            "invoice_id": 394,
            "invoice_item_number": 5,
            "product_id": 4,
            "quantity": 77,
            "cost": 192,
            "discount": 761,
            "self-closing": true
        },
        {
            "item_id": 1331,
            "invoice_id": 343,
            "invoice_item_number": 8,
            "product_id": 6,
            "quantity": 43,
            "cost": 1322,
            "discount": 207,
            "self-closing": true
        },
        {
            "item_id": 1332,
            "invoice_id": 82,
            "invoice_item_number": 4,
            "product_id": 7,
            "quantity": 78,
            "cost": 900,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1333,
            "invoice_id": 14,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 48,
            "cost": 156,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1334,
            "invoice_id": 377,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 47,
            "cost": 1327,
            "discount": 722,
            "self-closing": true
        },
        {
            "item_id": 1335,
            "invoice_id": 227,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 92,
            "cost": 895,
            "discount": 68,
            "self-closing": true
        },
        {
            "item_id": 1336,
            "invoice_id": 380,
            "invoice_item_number": 2,
            "product_id": 8,
            "quantity": 40,
            "cost": 814,
            "discount": 17,
            "self-closing": true
        },
        {
            "item_id": 1337,
            "invoice_id": 197,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 32,
            "cost": 329,
            "discount": 748,
            "self-closing": true
        },
        {
            "item_id": 1338,
            "invoice_id": 256,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 13,
            "cost": 1260,
            "discount": 483,
            "self-closing": true
        },
        {
            "item_id": 1339,
            "invoice_id": 15,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 70,
            "cost": 403,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1340,
            "invoice_id": 197,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 79,
            "cost": 192,
            "discount": 233,
            "self-closing": true
        },
        {
            "item_id": 1341,
            "invoice_id": 121,
            "invoice_item_number": 4,
            "product_id": 20,
            "quantity": 85,
            "cost": 855,
            "discount": 678,
            "self-closing": true
        },
        {
            "item_id": 1342,
            "invoice_id": 65,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 15,
            "cost": 1076,
            "discount": 394,
            "self-closing": true
        },
        {
            "item_id": 1343,
            "invoice_id": 237,
            "invoice_item_number": 5,
            "product_id": 11,
            "quantity": 33,
            "cost": 742,
            "discount": 396,
            "self-closing": true
        },
        {
            "item_id": 1344,
            "invoice_id": 90,
            "invoice_item_number": 8,
            "product_id": 15,
            "quantity": 13,
            "cost": 660,
            "discount": 454,
            "self-closing": true
        },
        {
            "item_id": 1345,
            "invoice_id": 351,
            "invoice_item_number": 7,
            "product_id": 7,
            "quantity": 11,
            "cost": 1017,
            "discount": 258,
            "self-closing": true
        },
        {
            "item_id": 1346,
            "invoice_id": 344,
            "invoice_item_number": 8,
            "product_id": 7,
            "quantity": 39,
            "cost": 704,
            "discount": 183,
            "self-closing": true
        },
        {
            "item_id": 1347,
            "invoice_id": 190,
            "invoice_item_number": 4,
            "product_id": 6,
            "quantity": 12,
            "cost": 421,
            "discount": 570,
            "self-closing": true
        },
        {
            "item_id": 1348,
            "invoice_id": 163,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 95,
            "cost": 507,
            "discount": 69,
            "self-closing": true
        },
        {
            "item_id": 1349,
            "invoice_id": 82,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 17,
            "cost": 200,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1350,
            "invoice_id": 328,
            "invoice_item_number": 9,
            "product_id": 21,
            "quantity": 15,
            "cost": 1106,
            "discount": 581,
            "self-closing": true
        },
        {
            "item_id": 1351,
            "invoice_id": 252,
            "invoice_item_number": 8,
            "product_id": 25,
            "quantity": 10,
            "cost": 1338,
            "discount": 372,
            "self-closing": true
        },
        {
            "item_id": 1352,
            "invoice_id": 208,
            "invoice_item_number": 8,
            "product_id": 17,
            "quantity": 87,
            "cost": 1017,
            "discount": 378,
            "self-closing": true
        },
        {
            "item_id": 1353,
            "invoice_id": 117,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 97,
            "cost": 1041,
            "discount": 931,
            "self-closing": true
        },
        {
            "item_id": 1354,
            "invoice_id": 330,
            "invoice_item_number": 7,
            "product_id": 16,
            "quantity": 45,
            "cost": 957,
            "discount": 63,
            "self-closing": true
        },
        {
            "item_id": 1355,
            "invoice_id": 288,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 19,
            "cost": 341,
            "discount": 65,
            "self-closing": true
        },
        {
            "item_id": 1356,
            "invoice_id": 37,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 35,
            "cost": 1340,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1357,
            "invoice_id": 339,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 47,
            "cost": 275,
            "discount": 771,
            "self-closing": true
        },
        {
            "item_id": 1358,
            "invoice_id": 134,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 52,
            "cost": 930,
            "discount": 515,
            "self-closing": true
        },
        {
            "item_id": 1359,
            "invoice_id": 141,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 71,
            "cost": 943,
            "discount": 646,
            "self-closing": true
        },
        {
            "item_id": 1360,
            "invoice_id": 82,
            "invoice_item_number": 2,
            "product_id": 1,
            "quantity": 71,
            "cost": 750,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1361,
            "invoice_id": 57,
            "invoice_item_number": 4,
            "product_id": 4,
            "quantity": 15,
            "cost": 736,
            "discount": 728,
            "self-closing": true
        },
        {
            "item_id": 1362,
            "invoice_id": 83,
            "invoice_item_number": 1,
            "product_id": 1,
            "quantity": 18,
            "cost": 199,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1363,
            "invoice_id": 68,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 28,
            "cost": 1454,
            "discount": 277,
            "self-closing": true
        },
        {
            "item_id": 1364,
            "invoice_id": 331,
            "invoice_item_number": 7,
            "product_id": 29,
            "quantity": 48,
            "cost": 1427,
            "discount": 841,
            "self-closing": true
        },
        {
            "item_id": 1365,
            "invoice_id": 143,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 35,
            "cost": 331,
            "discount": 53,
            "self-closing": true
        },
        {
            "item_id": 1366,
            "invoice_id": 35,
            "invoice_item_number": 9,
            "product_id": 26,
            "quantity": 17,
            "cost": 1102,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1367,
            "invoice_id": 169,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 14,
            "cost": 868,
            "discount": 688,
            "self-closing": true
        },
        {
            "item_id": 1368,
            "invoice_id": 218,
            "invoice_item_number": 3,
            "product_id": 23,
            "quantity": 10,
            "cost": 297,
            "discount": 308,
            "self-closing": true
        },
        {
            "item_id": 1369,
            "invoice_id": 373,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 43,
            "cost": 32,
            "discount": 791,
            "self-closing": true
        },
        {
            "item_id": 1370,
            "invoice_id": 377,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 91,
            "cost": 528,
            "discount": 364,
            "self-closing": true
        },
        {
            "item_id": 1371,
            "invoice_id": 400,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 89,
            "cost": 1073,
            "discount": 203,
            "self-closing": true
        },
        {
            "item_id": 1372,
            "invoice_id": 343,
            "invoice_item_number": 6,
            "product_id": 29,
            "quantity": 51,
            "cost": 1362,
            "discount": 930,
            "self-closing": true
        },
        {
            "item_id": 1373,
            "invoice_id": 224,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 13,
            "cost": 206,
            "discount": 170,
            "self-closing": true
        },
        {
            "item_id": 1374,
            "invoice_id": 260,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 49,
            "cost": 196,
            "discount": 547,
            "self-closing": true
        },
        {
            "item_id": 1375,
            "invoice_id": 183,
            "invoice_item_number": 6,
            "product_id": 9,
            "quantity": 57,
            "cost": 166,
            "discount": 923,
            "self-closing": true
        },
        {
            "item_id": 1376,
            "invoice_id": 246,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 94,
            "cost": 779,
            "discount": 170,
            "self-closing": true
        },
        {
            "item_id": 1377,
            "invoice_id": 62,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 79,
            "cost": 1368,
            "discount": 247,
            "self-closing": true
        },
        {
            "item_id": 1378,
            "invoice_id": 257,
            "invoice_item_number": 3,
            "product_id": 6,
            "quantity": 69,
            "cost": 359,
            "discount": 498,
            "self-closing": true
        },
        {
            "item_id": 1379,
            "invoice_id": 143,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 49,
            "cost": 688,
            "discount": 303,
            "self-closing": true
        },
        {
            "item_id": 1380,
            "invoice_id": 167,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 50,
            "cost": 120,
            "discount": 679,
            "self-closing": true
        },
        {
            "item_id": 1381,
            "invoice_id": 223,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 56,
            "cost": 348,
            "discount": 917,
            "self-closing": true
        },
        {
            "item_id": 1382,
            "invoice_id": 273,
            "invoice_item_number": 5,
            "product_id": 10,
            "quantity": 82,
            "cost": 1449,
            "discount": 514,
            "self-closing": true
        },
        {
            "item_id": 1383,
            "invoice_id": 73,
            "invoice_item_number": 2,
            "product_id": 18,
            "quantity": 65,
            "cost": 616,
            "discount": 759,
            "self-closing": true
        },
        {
            "item_id": 1384,
            "invoice_id": 307,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 47,
            "cost": 618,
            "discount": 162,
            "self-closing": true
        },
        {
            "item_id": 1385,
            "invoice_id": 241,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 18,
            "cost": 1328,
            "discount": 99,
            "self-closing": true
        },
        {
            "item_id": 1386,
            "invoice_id": 366,
            "invoice_item_number": 1,
            "product_id": 1,
            "quantity": 23,
            "cost": 2389,
            "discount": 34,
            "self-closing": true
        },
        {
            "item_id": 1387,
            "invoice_id": 135,
            "invoice_item_number": 6,
            "product_id": 26,
            "quantity": 80,
            "cost": 1194,
            "discount": 300,
            "self-closing": true
        },
        {
            "item_id": 1388,
            "invoice_id": 174,
            "invoice_item_number": 5,
            "product_id": 13,
            "quantity": 66,
            "cost": 1020,
            "discount": 96,
            "self-closing": true
        },
        {
            "item_id": 1389,
            "invoice_id": 313,
            "invoice_item_number": 8,
            "product_id": 8,
            "quantity": 20,
            "cost": 252,
            "discount": 594,
            "self-closing": true
        },
        {
            "item_id": 1390,
            "invoice_id": 102,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 73,
            "cost": 1368,
            "discount": 188,
            "self-closing": true
        },
        {
            "item_id": 1391,
            "invoice_id": 312,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 35,
            "cost": 568,
            "discount": 619,
            "self-closing": true
        },
        {
            "item_id": 1392,
            "invoice_id": 83,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 81,
            "cost": 850,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1393,
            "invoice_id": 53,
            "invoice_item_number": 5,
            "product_id": 9,
            "quantity": 89,
            "cost": 665,
            "discount": 110,
            "self-closing": true
        },
        {
            "item_id": 1394,
            "invoice_id": 219,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 44,
            "cost": 925,
            "discount": 770,
            "self-closing": true
        },
        {
            "item_id": 1395,
            "invoice_id": 219,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 100,
            "cost": 216,
            "discount": 865,
            "self-closing": true
        },
        {
            "item_id": 1396,
            "invoice_id": 98,
            "invoice_item_number": 6,
            "product_id": 13,
            "quantity": 41,
            "cost": 896,
            "discount": 252,
            "self-closing": true
        },
        {
            "item_id": 1397,
            "invoice_id": 188,
            "invoice_item_number": 9,
            "product_id": 6,
            "quantity": 91,
            "cost": 940,
            "discount": 174,
            "self-closing": true
        },
        {
            "item_id": 1398,
            "invoice_id": 173,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 53,
            "cost": 429,
            "discount": 466,
            "self-closing": true
        },
        {
            "item_id": 1399,
            "invoice_id": 143,
            "invoice_item_number": 7,
            "product_id": 23,
            "quantity": 81,
            "cost": 69,
            "discount": 177,
            "self-closing": true
        },
        {
            "item_id": 1400,
            "invoice_id": 335,
            "invoice_item_number": 5,
            "product_id": 25,
            "quantity": 93,
            "cost": 258,
            "discount": 215,
            "self-closing": true
        },
        {
            "item_id": 1401,
            "invoice_id": 368,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 36,
            "cost": 1122,
            "discount": 683,
            "self-closing": true
        },
        {
            "item_id": 1402,
            "invoice_id": 89,
            "invoice_item_number": 6,
            "product_id": 28,
            "quantity": 82,
            "cost": 326,
            "discount": 394,
            "self-closing": true
        },
        {
            "item_id": 1403,
            "invoice_id": 98,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 19,
            "cost": 1197,
            "discount": 590,
            "self-closing": true
        },
        {
            "item_id": 1404,
            "invoice_id": 332,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 12,
            "cost": 1426,
            "discount": 427,
            "self-closing": true
        },
        {
            "item_id": 1405,
            "invoice_id": 32,
            "invoice_item_number": 6,
            "product_id": 13,
            "quantity": 71,
            "cost": 733,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1406,
            "invoice_id": 182,
            "invoice_item_number": 9,
            "product_id": 5,
            "quantity": 35,
            "cost": 792,
            "discount": 207,
            "self-closing": true
        },
        {
            "item_id": 1407,
            "invoice_id": 373,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 56,
            "cost": 593,
            "discount": 101,
            "self-closing": true
        },
        {
            "item_id": 1408,
            "invoice_id": 166,
            "invoice_item_number": 2,
            "product_id": 16,
            "quantity": 94,
            "cost": 922,
            "discount": 927,
            "self-closing": true
        },
        {
            "item_id": 1409,
            "invoice_id": 262,
            "invoice_item_number": 5,
            "product_id": 27,
            "quantity": 43,
            "cost": 826,
            "discount": 642,
            "self-closing": true
        },
        {
            "item_id": 1410,
            "invoice_id": 107,
            "invoice_item_number": 3,
            "product_id": 27,
            "quantity": 26,
            "cost": 818,
            "discount": 419,
            "self-closing": true
        },
        {
            "item_id": 1411,
            "invoice_id": 57,
            "invoice_item_number": 5,
            "product_id": 7,
            "quantity": 26,
            "cost": 358,
            "discount": 275,
            "self-closing": true
        },
        {
            "item_id": 1412,
            "invoice_id": 152,
            "invoice_item_number": 9,
            "product_id": 9,
            "quantity": 34,
            "cost": 231,
            "discount": 300,
            "self-closing": true
        },
        {
            "item_id": 1413,
            "invoice_id": 194,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 89,
            "cost": 206,
            "discount": 507,
            "self-closing": true
        },
        {
            "item_id": 1414,
            "invoice_id": 66,
            "invoice_item_number": 8,
            "product_id": 5,
            "quantity": 14,
            "cost": 559,
            "discount": 322,
            "self-closing": true
        },
        {
            "item_id": 1415,
            "invoice_id": 398,
            "invoice_item_number": 8,
            "product_id": 16,
            "quantity": 63,
            "cost": 1076,
            "discount": 699,
            "self-closing": true
        },
        {
            "item_id": 1416,
            "invoice_id": 297,
            "invoice_item_number": 7,
            "product_id": 7,
            "quantity": 60,
            "cost": 421,
            "discount": 739,
            "self-closing": true
        },
        {
            "item_id": 1417,
            "invoice_id": 325,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 82,
            "cost": 308,
            "discount": 452,
            "self-closing": true
        },
        {
            "item_id": 1418,
            "invoice_id": 356,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 64,
            "cost": 1333,
            "discount": 816,
            "self-closing": true
        },
        {
            "item_id": 1419,
            "invoice_id": 267,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 47,
            "cost": 331,
            "discount": 299,
            "self-closing": true
        },
        {
            "item_id": 1420,
            "invoice_id": 83,
            "invoice_item_number": 3,
            "product_id": 19,
            "quantity": 15,
            "cost": 150,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1421,
            "invoice_id": 83,
            "invoice_item_number": 4,
            "product_id": 29,
            "quantity": 51,
            "cost": 550,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1422,
            "invoice_id": 191,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 27,
            "cost": 1479,
            "discount": 718,
            "self-closing": true
        },
        {
            "item_id": 1423,
            "invoice_id": 83,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 5,
            "cost": 18,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1424,
            "invoice_id": 218,
            "invoice_item_number": 4,
            "product_id": 6,
            "quantity": 54,
            "cost": 1313,
            "discount": 809,
            "self-closing": true
        },
        {
            "item_id": 1425,
            "invoice_id": 173,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 56,
            "cost": 727,
            "discount": 732,
            "self-closing": true
        },
        {
            "item_id": 1426,
            "invoice_id": 373,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 98,
            "cost": 936,
            "discount": 273,
            "self-closing": true
        },
        {
            "item_id": 1427,
            "invoice_id": 217,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 41,
            "cost": 587,
            "discount": 107,
            "self-closing": true
        },
        {
            "item_id": 1428,
            "invoice_id": 357,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 82,
            "cost": 1476,
            "discount": 902,
            "self-closing": true
        },
        {
            "item_id": 1429,
            "invoice_id": 167,
            "invoice_item_number": 3,
            "product_id": 23,
            "quantity": 19,
            "cost": 662,
            "discount": 209,
            "self-closing": true
        },
        {
            "item_id": 1430,
            "invoice_id": 318,
            "invoice_item_number": 4,
            "product_id": 18,
            "quantity": 94,
            "cost": 153,
            "discount": 529,
            "self-closing": true
        },
        {
            "item_id": 1431,
            "invoice_id": 94,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 67,
            "cost": 927,
            "discount": 565,
            "self-closing": true
        },
        {
            "item_id": 1432,
            "invoice_id": 217,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 61,
            "cost": 1325,
            "discount": 750,
            "self-closing": true
        },
        {
            "item_id": 1433,
            "invoice_id": 289,
            "invoice_item_number": 6,
            "product_id": 7,
            "quantity": 37,
            "cost": 829,
            "discount": 129,
            "self-closing": true
        },
        {
            "item_id": 1434,
            "invoice_id": 227,
            "invoice_item_number": 6,
            "product_id": 23,
            "quantity": 33,
            "cost": 1379,
            "discount": 303,
            "self-closing": true
        },
        {
            "item_id": 1435,
            "invoice_id": 22,
            "invoice_item_number": 5,
            "product_id": 10,
            "quantity": 91,
            "cost": 342,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1436,
            "invoice_id": 212,
            "invoice_item_number": 8,
            "product_id": 16,
            "quantity": 36,
            "cost": 245,
            "discount": 775,
            "self-closing": true
        },
        {
            "item_id": 1437,
            "invoice_id": 327,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 71,
            "cost": 998,
            "discount": 419,
            "self-closing": true
        },
        {
            "item_id": 1438,
            "invoice_id": 240,
            "invoice_item_number": 8,
            "product_id": 22,
            "quantity": 11,
            "cost": 740,
            "discount": 398,
            "self-closing": true
        },
        {
            "item_id": 1439,
            "invoice_id": 83,
            "invoice_item_number": 6,
            "product_id": 30,
            "quantity": 150,
            "cost": 320,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1440,
            "invoice_id": 345,
            "invoice_item_number": 9,
            "product_id": 13,
            "quantity": 77,
            "cost": 1035,
            "discount": 783,
            "self-closing": true
        },
        {
            "item_id": 1441,
            "invoice_id": 253,
            "invoice_item_number": 3,
            "product_id": 23,
            "quantity": 63,
            "cost": 1376,
            "discount": 277,
            "self-closing": true
        },
        {
            "item_id": 1442,
            "invoice_id": 146,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 85,
            "cost": 215,
            "discount": 641,
            "self-closing": true
        },
        {
            "item_id": 1443,
            "invoice_id": 139,
            "invoice_item_number": 2,
            "product_id": 26,
            "quantity": 14,
            "cost": 1456,
            "discount": 784,
            "self-closing": true
        },
        {
            "item_id": 1444,
            "invoice_id": 264,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 87,
            "cost": 143,
            "discount": 370,
            "self-closing": true
        },
        {
            "item_id": 1445,
            "invoice_id": 83,
            "invoice_item_number": 7,
            "product_id": 17,
            "quantity": 151,
            "cost": 300,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1446,
            "invoice_id": 326,
            "invoice_item_number": 4,
            "product_id": 11,
            "quantity": 32,
            "cost": 107,
            "discount": 705,
            "self-closing": true
        },
        {
            "item_id": 1447,
            "invoice_id": 316,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 39,
            "cost": 204,
            "discount": 243,
            "self-closing": true
        },
        {
            "item_id": 1448,
            "invoice_id": 344,
            "invoice_item_number": 6,
            "product_id": 28,
            "quantity": 71,
            "cost": 313,
            "discount": 262,
            "self-closing": true
        },
        {
            "item_id": 1449,
            "invoice_id": 224,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 14,
            "cost": 238,
            "discount": 632,
            "self-closing": true
        },
        {
            "item_id": 1450,
            "invoice_id": 7,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 77,
            "cost": 1055,
            "discount": 686,
            "self-closing": true
        },
        {
            "item_id": 1451,
            "invoice_id": 384,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 91,
            "cost": 364,
            "discount": 610,
            "self-closing": true
        },
        {
            "item_id": 1452,
            "invoice_id": 248,
            "invoice_item_number": 9,
            "product_id": 30,
            "quantity": 57,
            "cost": 828,
            "discount": 879,
            "self-closing": true
        },
        {
            "item_id": 1453,
            "invoice_id": 174,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 74,
            "cost": 136,
            "discount": 513,
            "self-closing": true
        },
        {
            "item_id": 1454,
            "invoice_id": 10,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 49,
            "cost": 1113,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1455,
            "invoice_id": 83,
            "invoice_item_number": 8,
            "product_id": 7,
            "quantity": 109,
            "cost": 190,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1456,
            "invoice_id": 390,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 67,
            "cost": 641,
            "discount": 608,
            "self-closing": true
        },
        {
            "item_id": 1457,
            "invoice_id": 355,
            "invoice_item_number": 8,
            "product_id": 30,
            "quantity": 46,
            "cost": 1118,
            "discount": 986,
            "self-closing": true
        },
        {
            "item_id": 1458,
            "invoice_id": 155,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 60,
            "cost": 6800,
            "discount": 120,
            "self-closing": true
        },
        {
            "item_id": 1459,
            "invoice_id": 293,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 83,
            "cost": 279,
            "discount": 701,
            "self-closing": true
        },
        {
            "item_id": 1460,
            "invoice_id": 271,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 16,
            "cost": 257,
            "discount": 728,
            "self-closing": true
        },
        {
            "item_id": 1461,
            "invoice_id": 99,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 81,
            "cost": 664,
            "discount": 93,
            "self-closing": true
        },
        {
            "item_id": 1462,
            "invoice_id": 212,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 54,
            "cost": 515,
            "discount": 273,
            "self-closing": true
        },
        {
            "item_id": 1463,
            "invoice_id": 174,
            "invoice_item_number": 5,
            "product_id": 10,
            "quantity": 22,
            "cost": 742,
            "discount": 133,
            "self-closing": true
        },
        {
            "item_id": 1464,
            "invoice_id": 260,
            "invoice_item_number": 3,
            "product_id": 28,
            "quantity": 66,
            "cost": 623,
            "discount": 703,
            "self-closing": true
        },
        {
            "item_id": 1465,
            "invoice_id": 257,
            "invoice_item_number": 7,
            "product_id": 9,
            "quantity": 50,
            "cost": 1088,
            "discount": 518,
            "self-closing": true
        },
        {
            "item_id": 1466,
            "invoice_id": 169,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 84,
            "cost": 1195,
            "discount": 354,
            "self-closing": true
        },
        {
            "item_id": 1467,
            "invoice_id": 296,
            "invoice_item_number": 9,
            "product_id": 29,
            "quantity": 41,
            "cost": 671,
            "discount": 56,
            "self-closing": true
        },
        {
            "item_id": 1468,
            "invoice_id": 85,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 13,
            "cost": 903,
            "discount": 995,
            "self-closing": true
        },
        {
            "item_id": 1469,
            "invoice_id": 192,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 46,
            "cost": 639,
            "discount": 569,
            "self-closing": true
        },
        {
            "item_id": 1470,
            "invoice_id": 61,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 91,
            "cost": 969,
            "discount": 209,
            "self-closing": true
        },
        {
            "item_id": 1471,
            "invoice_id": 317,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 20,
            "cost": 776,
            "discount": 675,
            "self-closing": true
        },
        {
            "item_id": 1472,
            "invoice_id": 156,
            "invoice_item_number": 1,
            "product_id": 5,
            "quantity": 30,
            "cost": 1400,
            "discount": 300,
            "self-closing": true
        },
        {
            "item_id": 1473,
            "invoice_id": 205,
            "invoice_item_number": 5,
            "product_id": 13,
            "quantity": 90,
            "cost": 114,
            "discount": 314,
            "self-closing": true
        },
        {
            "item_id": 1474,
            "invoice_id": 156,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 50,
            "cost": 15000,
            "discount": 5000,
            "self-closing": true
        },
        {
            "item_id": 1475,
            "invoice_id": 316,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 10,
            "cost": 592,
            "discount": 957,
            "self-closing": true
        },
        {
            "item_id": 1476,
            "invoice_id": 157,
            "invoice_item_number": 1,
            "product_id": 10,
            "quantity": 30,
            "cost": 1120,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1477,
            "invoice_id": 200,
            "invoice_item_number": 4,
            "product_id": 6,
            "quantity": 88,
            "cost": 310,
            "discount": 876,
            "self-closing": true
        },
        {
            "item_id": 1478,
            "invoice_id": 34,
            "invoice_item_number": 9,
            "product_id": 29,
            "quantity": 63,
            "cost": 631,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1479,
            "invoice_id": 103,
            "invoice_item_number": 9,
            "product_id": 15,
            "quantity": 41,
            "cost": 946,
            "discount": 62,
            "self-closing": true
        },
        {
            "item_id": 1480,
            "invoice_id": 129,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 92,
            "cost": 1096,
            "discount": 381,
            "self-closing": true
        },
        {
            "item_id": 1481,
            "invoice_id": 94,
            "invoice_item_number": 4,
            "product_id": 13,
            "quantity": 83,
            "cost": 653,
            "discount": 983,
            "self-closing": true
        },
        {
            "item_id": 1482,
            "invoice_id": 398,
            "invoice_item_number": 6,
            "product_id": 13,
            "quantity": 49,
            "cost": 719,
            "discount": 995,
            "self-closing": true
        },
        {
            "item_id": 1483,
            "invoice_id": 157,
            "invoice_item_number": 2,
            "product_id": 20,
            "quantity": 45,
            "cost": 2345,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1484,
            "invoice_id": 130,
            "invoice_item_number": 8,
            "product_id": 9,
            "quantity": 78,
            "cost": 641,
            "discount": 215,
            "self-closing": true
        },
        {
            "item_id": 1485,
            "invoice_id": 158,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 45,
            "cost": 4567,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1486,
            "invoice_id": 390,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 20,
            "cost": 101,
            "discount": 948,
            "self-closing": true
        },
        {
            "item_id": 1487,
            "invoice_id": 158,
            "invoice_item_number": 1,
            "product_id": 22,
            "quantity": 50,
            "cost": 5666,
            "discount": 999,
            "self-closing": true
        },
        {
            "item_id": 1488,
            "invoice_id": 336,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 81,
            "cost": 112,
            "discount": 525,
            "self-closing": true
        },
        {
            "item_id": 1489,
            "invoice_id": 250,
            "invoice_item_number": 8,
            "product_id": 17,
            "quantity": 28,
            "cost": 463,
            "discount": 143,
            "self-closing": true
        },
        {
            "item_id": 1490,
            "invoice_id": 253,
            "invoice_item_number": 7,
            "product_id": 3,
            "quantity": 53,
            "cost": 1320,
            "discount": 992,
            "self-closing": true
        },
        {
            "item_id": 1491,
            "invoice_id": 226,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 37,
            "cost": 409,
            "discount": 586,
            "self-closing": true
        },
        {
            "item_id": 1492,
            "invoice_id": 288,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 93,
            "cost": 1304,
            "discount": 379,
            "self-closing": true
        },
        {
            "item_id": 1493,
            "invoice_id": 159,
            "invoice_item_number": 1,
            "product_id": 25,
            "quantity": 99,
            "cost": 1800,
            "discount": 100,
            "self-closing": true
        },
        {
            "item_id": 1494,
            "invoice_id": 248,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 34,
            "cost": 324,
            "discount": 10,
            "self-closing": true
        },
        {
            "item_id": 1495,
            "invoice_id": 10,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 42,
            "cost": 52,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1496,
            "invoice_id": 159,
            "invoice_item_number": 2,
            "product_id": 30,
            "quantity": 40,
            "cost": 400,
            "discount": 25,
            "self-closing": true
        },
        {
            "item_id": 1497,
            "invoice_id": 243,
            "invoice_item_number": 6,
            "product_id": 9,
            "quantity": 73,
            "cost": 684,
            "discount": 921,
            "self-closing": true
        },
        {
            "item_id": 1498,
            "invoice_id": 179,
            "invoice_item_number": 4,
            "product_id": 7,
            "quantity": 52,
            "cost": 68,
            "discount": 889,
            "self-closing": true
        },
        {
            "item_id": 1499,
            "invoice_id": 129,
            "invoice_item_number": 6,
            "product_id": 25,
            "quantity": 64,
            "cost": 717,
            "discount": 502,
            "self-closing": true
        },
        {
            "item_id": 1500,
            "invoice_id": 399,
            "invoice_item_number": 1,
            "product_id": 14,
            "quantity": 39,
            "cost": 942,
            "discount": 852,
            "self-closing": true
        },
        {
            "item_id": 1501,
            "invoice_id": 95,
            "invoice_item_number": 8,
            "product_id": 6,
            "quantity": 67,
            "cost": 771,
            "discount": 734,
            "self-closing": true
        },
        {
            "item_id": 1502,
            "invoice_id": 180,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 59,
            "cost": 923,
            "discount": 889,
            "self-closing": true
        },
        {
            "item_id": 1503,
            "invoice_id": 180,
            "invoice_item_number": 9,
            "product_id": 11,
            "quantity": 14,
            "cost": 735,
            "discount": 767,
            "self-closing": true
        },
        {
            "item_id": 1504,
            "invoice_id": 18,
            "invoice_item_number": 2,
            "product_id": 28,
            "quantity": 70,
            "cost": 1445,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1505,
            "invoice_id": 74,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 86,
            "cost": 149,
            "discount": 627,
            "self-closing": true
        },
        {
            "item_id": 1506,
            "invoice_id": 305,
            "invoice_item_number": 5,
            "product_id": 8,
            "quantity": 58,
            "cost": 30,
            "discount": 232,
            "self-closing": true
        },
        {
            "item_id": 1507,
            "invoice_id": 160,
            "invoice_item_number": 1,
            "product_id": 5,
            "quantity": 150,
            "cost": 15650,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1508,
            "invoice_id": 168,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 85,
            "cost": 1370,
            "discount": 173,
            "self-closing": true
        },
        {
            "item_id": 1509,
            "invoice_id": 160,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 200,
            "cost": 20350,
            "discount": 1300,
            "self-closing": true
        },
        {
            "item_id": 1510,
            "invoice_id": 204,
            "invoice_item_number": 4,
            "product_id": 4,
            "quantity": 14,
            "cost": 188,
            "discount": 37,
            "self-closing": true
        },
        {
            "item_id": 1511,
            "invoice_id": 165,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 80,
            "cost": 1284,
            "discount": 163,
            "self-closing": true
        },
        {
            "item_id": 1512,
            "invoice_id": 53,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 19,
            "cost": 930,
            "discount": 726,
            "self-closing": true
        },
        {
            "item_id": 1513,
            "invoice_id": 394,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 59,
            "cost": 403,
            "discount": 152,
            "self-closing": true
        },
        {
            "item_id": 1514,
            "invoice_id": 8,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 38,
            "cost": 1331,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1515,
            "invoice_id": 28,
            "invoice_item_number": 5,
            "product_id": 8,
            "quantity": 15,
            "cost": 1395,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1516,
            "invoice_id": 220,
            "invoice_item_number": 2,
            "product_id": 16,
            "quantity": 62,
            "cost": 1127,
            "discount": 816,
            "self-closing": true
        },
        {
            "item_id": 1517,
            "invoice_id": 257,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 100,
            "cost": 236,
            "discount": 542,
            "self-closing": true
        },
        {
            "item_id": 1518,
            "invoice_id": 335,
            "invoice_item_number": 5,
            "product_id": 13,
            "quantity": 13,
            "cost": 1417,
            "discount": 980,
            "self-closing": true
        },
        {
            "item_id": 1519,
            "invoice_id": 203,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 68,
            "cost": 1223,
            "discount": 551,
            "self-closing": true
        },
        {
            "item_id": 1520,
            "invoice_id": 26,
            "invoice_item_number": 6,
            "product_id": 16,
            "quantity": 98,
            "cost": 688,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1521,
            "invoice_id": 207,
            "invoice_item_number": 6,
            "product_id": 22,
            "quantity": 66,
            "cost": 181,
            "discount": 35,
            "self-closing": true
        },
        {
            "item_id": 1522,
            "invoice_id": 186,
            "invoice_item_number": 4,
            "product_id": 14,
            "quantity": 31,
            "cost": 589,
            "discount": 405,
            "self-closing": true
        },
        {
            "item_id": 1523,
            "invoice_id": 362,
            "invoice_item_number": 7,
            "product_id": 19,
            "quantity": 213,
            "cost": 2130,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1524,
            "invoice_id": 15,
            "invoice_item_number": 6,
            "product_id": 24,
            "quantity": 66,
            "cost": 1151,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1525,
            "invoice_id": 395,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 45,
            "cost": 343,
            "discount": 798,
            "self-closing": true
        },
        {
            "item_id": 1526,
            "invoice_id": 24,
            "invoice_item_number": 4,
            "product_id": 28,
            "quantity": 49,
            "cost": 354,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1527,
            "invoice_id": 283,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 67,
            "cost": 1495,
            "discount": 859,
            "self-closing": true
        },
        {
            "item_id": 1528,
            "invoice_id": 358,
            "invoice_item_number": 6,
            "product_id": 23,
            "quantity": 57,
            "cost": 693,
            "discount": 51,
            "self-closing": true
        },
        {
            "item_id": 1529,
            "invoice_id": 35,
            "invoice_item_number": 7,
            "product_id": 12,
            "quantity": 56,
            "cost": 380,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1530,
            "invoice_id": 25,
            "invoice_item_number": 8,
            "product_id": 25,
            "quantity": 14,
            "cost": 709,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1531,
            "invoice_id": 299,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 56,
            "cost": 633,
            "discount": 788,
            "self-closing": true
        },
        {
            "item_id": 1532,
            "invoice_id": 397,
            "invoice_item_number": 8,
            "product_id": 14,
            "quantity": 58,
            "cost": 1192,
            "discount": 897,
            "self-closing": true
        },
        {
            "item_id": 1533,
            "invoice_id": 132,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 13,
            "cost": 1042,
            "discount": 435,
            "self-closing": true
        },
        {
            "item_id": 1534,
            "invoice_id": 372,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 74,
            "cost": 1454,
            "discount": 258,
            "self-closing": true
        },
        {
            "item_id": 1535,
            "invoice_id": 362,
            "invoice_item_number": 6,
            "product_id": 29,
            "quantity": 5,
            "cost": 50,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1536,
            "invoice_id": 339,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 93,
            "cost": 1002,
            "discount": 986,
            "self-closing": true
        },
        {
            "item_id": 1537,
            "invoice_id": 275,
            "invoice_item_number": 2,
            "product_id": 7,
            "quantity": 89,
            "cost": 796,
            "discount": 924,
            "self-closing": true
        },
        {
            "item_id": 1538,
            "invoice_id": 346,
            "invoice_item_number": 8,
            "product_id": 17,
            "quantity": 19,
            "cost": 802,
            "discount": 494,
            "self-closing": true
        },
        {
            "item_id": 1539,
            "invoice_id": 16,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 85,
            "cost": 694,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1540,
            "invoice_id": 104,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 78,
            "cost": 171,
            "discount": 971,
            "self-closing": true
        },
        {
            "item_id": 1541,
            "invoice_id": 373,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 98,
            "cost": 1459,
            "discount": 414,
            "self-closing": true
        },
        {
            "item_id": 1542,
            "invoice_id": 360,
            "invoice_item_number": 2,
            "product_id": 22,
            "quantity": 32,
            "cost": 1101,
            "discount": 356,
            "self-closing": true
        },
        {
            "item_id": 1543,
            "invoice_id": 362,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 4,
            "cost": 40,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1544,
            "invoice_id": 291,
            "invoice_item_number": 8,
            "product_id": 24,
            "quantity": 79,
            "cost": 210,
            "discount": 682,
            "self-closing": true
        },
        {
            "item_id": 1545,
            "invoice_id": 396,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 92,
            "cost": 1116,
            "discount": 202,
            "self-closing": true
        },
        {
            "item_id": 1546,
            "invoice_id": 330,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 86,
            "cost": 920,
            "discount": 948,
            "self-closing": true
        },
        {
            "item_id": 1547,
            "invoice_id": 29,
            "invoice_item_number": 6,
            "product_id": 26,
            "quantity": 77,
            "cost": 631,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1548,
            "invoice_id": 354,
            "invoice_item_number": 6,
            "product_id": 16,
            "quantity": 92,
            "cost": 1110,
            "discount": 349,
            "self-closing": true
        },
        {
            "item_id": 1549,
            "invoice_id": 338,
            "invoice_item_number": 9,
            "product_id": 16,
            "quantity": 55,
            "cost": 1208,
            "discount": 492,
            "self-closing": true
        },
        {
            "item_id": 1550,
            "invoice_id": 374,
            "invoice_item_number": 8,
            "product_id": 2,
            "quantity": 63,
            "cost": 550,
            "discount": 44,
            "self-closing": true
        },
        {
            "item_id": 1551,
            "invoice_id": 325,
            "invoice_item_number": 6,
            "product_id": 25,
            "quantity": 61,
            "cost": 904,
            "discount": 596,
            "self-closing": true
        },
        {
            "item_id": 1552,
            "invoice_id": 112,
            "invoice_item_number": 5,
            "product_id": 14,
            "quantity": 70,
            "cost": 197,
            "discount": 888,
            "self-closing": true
        },
        {
            "item_id": 1553,
            "invoice_id": 180,
            "invoice_item_number": 2,
            "product_id": 8,
            "quantity": 84,
            "cost": 1016,
            "discount": 325,
            "self-closing": true
        },
        {
            "item_id": 1554,
            "invoice_id": 59,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 31,
            "cost": 52,
            "discount": 90,
            "self-closing": true
        },
        {
            "item_id": 1555,
            "invoice_id": 362,
            "invoice_item_number": 5,
            "product_id": 2,
            "quantity": 54,
            "cost": 540,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1556,
            "invoice_id": 34,
            "invoice_item_number": 8,
            "product_id": 29,
            "quantity": 10,
            "cost": 1451,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1557,
            "invoice_id": 387,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 89,
            "cost": 516,
            "discount": 677,
            "self-closing": true
        },
        {
            "item_id": 1558,
            "invoice_id": 141,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 93,
            "cost": 201,
            "discount": 171,
            "self-closing": true
        },
        {
            "item_id": 1559,
            "invoice_id": 123,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 16,
            "cost": 709,
            "discount": 715,
            "self-closing": true
        },
        {
            "item_id": 1560,
            "invoice_id": 209,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 91,
            "cost": 1317,
            "discount": 783,
            "self-closing": true
        },
        {
            "item_id": 1561,
            "invoice_id": 375,
            "invoice_item_number": 4,
            "product_id": 4,
            "quantity": 34,
            "cost": 213,
            "discount": 67,
            "self-closing": true
        },
        {
            "item_id": 1562,
            "invoice_id": 100,
            "invoice_item_number": 5,
            "product_id": 28,
            "quantity": 22,
            "cost": 789,
            "discount": 335,
            "self-closing": true
        },
        {
            "item_id": 1563,
            "invoice_id": 375,
            "invoice_item_number": 8,
            "product_id": 12,
            "quantity": 12,
            "cost": 1447,
            "discount": 415,
            "self-closing": true
        },
        {
            "item_id": 1564,
            "invoice_id": 362,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 59,
            "cost": 1459,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1565,
            "invoice_id": 300,
            "invoice_item_number": 4,
            "product_id": 10,
            "quantity": 80,
            "cost": 1100,
            "discount": 905,
            "self-closing": true
        },
        {
            "item_id": 1566,
            "invoice_id": 26,
            "invoice_item_number": 5,
            "product_id": 26,
            "quantity": 90,
            "cost": 1381,
            "discount": 157,
            "self-closing": true
        },
        {
            "item_id": 1567,
            "invoice_id": 70,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 71,
            "cost": 1365,
            "discount": 599,
            "self-closing": true
        },
        {
            "item_id": 1568,
            "invoice_id": 274,
            "invoice_item_number": 6,
            "product_id": 4,
            "quantity": 79,
            "cost": 369,
            "discount": 39,
            "self-closing": true
        },
        {
            "item_id": 1569,
            "invoice_id": 22,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 44,
            "cost": 537,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1570,
            "invoice_id": 233,
            "invoice_item_number": 2,
            "product_id": 26,
            "quantity": 98,
            "cost": 249,
            "discount": 505,
            "self-closing": true
        },
        {
            "item_id": 1571,
            "invoice_id": 206,
            "invoice_item_number": 9,
            "product_id": 13,
            "quantity": 81,
            "cost": 1165,
            "discount": 700,
            "self-closing": true
        },
        {
            "item_id": 1572,
            "invoice_id": 209,
            "invoice_item_number": 8,
            "product_id": 4,
            "quantity": 77,
            "cost": 411,
            "discount": 197,
            "self-closing": true
        },
        {
            "item_id": 1573,
            "invoice_id": 143,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 3,
            "cost": 1166,
            "discount": 260,
            "self-closing": true
        },
        {
            "item_id": 1574,
            "invoice_id": 29,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 11,
            "cost": 611,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1575,
            "invoice_id": 179,
            "invoice_item_number": 2,
            "product_id": 16,
            "quantity": 81,
            "cost": 1271,
            "discount": 232,
            "self-closing": true
        },
        {
            "item_id": 1576,
            "invoice_id": 62,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 17,
            "cost": 865,
            "discount": 601,
            "self-closing": true
        },
        {
            "item_id": 1577,
            "invoice_id": 17,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 44,
            "cost": 560,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1578,
            "invoice_id": 149,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 78,
            "cost": 82,
            "discount": 394,
            "self-closing": true
        },
        {
            "item_id": 1579,
            "invoice_id": 100,
            "invoice_item_number": 4,
            "product_id": 17,
            "quantity": 49,
            "cost": 804,
            "discount": 836,
            "self-closing": true
        },
        {
            "item_id": 1580,
            "invoice_id": 383,
            "invoice_item_number": 4,
            "product_id": 17,
            "quantity": 22,
            "cost": 1340,
            "discount": 238,
            "self-closing": true
        },
        {
            "item_id": 1581,
            "invoice_id": 31,
            "invoice_item_number": 2,
            "product_id": 22,
            "quantity": 44,
            "cost": 565,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1582,
            "invoice_id": 324,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 87,
            "cost": 180,
            "discount": 443,
            "self-closing": true
        },
        {
            "item_id": 1583,
            "invoice_id": 139,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 77,
            "cost": 474,
            "discount": 181,
            "self-closing": true
        },
        {
            "item_id": 1584,
            "invoice_id": 145,
            "invoice_item_number": 1,
            "product_id": 2,
            "quantity": 98,
            "cost": 1030,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1585,
            "invoice_id": 252,
            "invoice_item_number": 5,
            "product_id": 7,
            "quantity": 99,
            "cost": 594,
            "discount": 195,
            "self-closing": true
        },
        {
            "item_id": 1586,
            "invoice_id": 362,
            "invoice_item_number": 1,
            "product_id": 4,
            "quantity": 45,
            "cost": 450,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1587,
            "invoice_id": 140,
            "invoice_item_number": 8,
            "product_id": 3,
            "quantity": 90,
            "cost": 949,
            "discount": 288,
            "self-closing": true
        },
        {
            "item_id": 1588,
            "invoice_id": 153,
            "invoice_item_number": 2,
            "product_id": 26,
            "quantity": 60,
            "cost": 1024,
            "discount": 984,
            "self-closing": true
        },
        {
            "item_id": 1589,
            "invoice_id": 119,
            "invoice_item_number": 3,
            "product_id": 7,
            "quantity": 60,
            "cost": 806,
            "discount": 789,
            "self-closing": true
        },
        {
            "item_id": 1590,
            "invoice_id": 25,
            "invoice_item_number": 9,
            "product_id": 5,
            "quantity": 74,
            "cost": 131,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1591,
            "invoice_id": 170,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 43,
            "cost": 888,
            "discount": 765,
            "self-closing": true
        },
        {
            "item_id": 1592,
            "invoice_id": 153,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 58,
            "cost": 75,
            "discount": 729,
            "self-closing": true
        },
        {
            "item_id": 1593,
            "invoice_id": 362,
            "invoice_item_number": 2,
            "product_id": 14,
            "quantity": 123,
            "cost": 15000,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1594,
            "invoice_id": 38,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 55,
            "cost": 1360,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1595,
            "invoice_id": 142,
            "invoice_item_number": 1,
            "product_id": 16,
            "quantity": 72,
            "cost": 587,
            "discount": 85,
            "self-closing": true
        },
        {
            "item_id": 1596,
            "invoice_id": 166,
            "invoice_item_number": 1,
            "product_id": 10,
            "quantity": 11,
            "cost": 513,
            "discount": 624,
            "self-closing": true
        },
        {
            "item_id": 1597,
            "invoice_id": 138,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 10,
            "cost": 1432,
            "discount": 542,
            "self-closing": true
        },
        {
            "item_id": 1598,
            "invoice_id": 363,
            "invoice_item_number": 1,
            "product_id": 2,
            "quantity": 5,
            "cost": 150,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1599,
            "invoice_id": 246,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 64,
            "cost": 1078,
            "discount": 80,
            "self-closing": true
        },
        {
            "item_id": 1600,
            "invoice_id": 37,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 54,
            "cost": 1381,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1601,
            "invoice_id": 99,
            "invoice_item_number": 5,
            "product_id": 26,
            "quantity": 74,
            "cost": 632,
            "discount": 477,
            "self-closing": true
        },
        {
            "item_id": 1602,
            "invoice_id": 363,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 23,
            "cost": 230,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1603,
            "invoice_id": 51,
            "invoice_item_number": 6,
            "product_id": 22,
            "quantity": 59,
            "cost": 1103,
            "discount": 757,
            "self-closing": true
        },
        {
            "item_id": 1604,
            "invoice_id": 116,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 17,
            "cost": 1242,
            "discount": 964,
            "self-closing": true
        },
        {
            "item_id": 1605,
            "invoice_id": 256,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 35,
            "cost": 1204,
            "discount": 310,
            "self-closing": true
        },
        {
            "item_id": 1606,
            "invoice_id": 389,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 48,
            "cost": 1315,
            "discount": 496,
            "self-closing": true
        },
        {
            "item_id": 1607,
            "invoice_id": 101,
            "invoice_item_number": 4,
            "product_id": 13,
            "quantity": 64,
            "cost": 1254,
            "discount": 899,
            "self-closing": true
        },
        {
            "item_id": 1608,
            "invoice_id": 20,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 46,
            "cost": 1431,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1609,
            "invoice_id": 363,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 27,
            "cost": 340,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1610,
            "invoice_id": 381,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 70,
            "cost": 978,
            "discount": 953,
            "self-closing": true
        },
        {
            "item_id": 1611,
            "invoice_id": 3,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 89,
            "cost": 869,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1612,
            "invoice_id": 360,
            "invoice_item_number": 2,
            "product_id": 7,
            "quantity": 74,
            "cost": 978,
            "discount": 204,
            "self-closing": true
        },
        {
            "item_id": 1613,
            "invoice_id": 304,
            "invoice_item_number": 8,
            "product_id": 22,
            "quantity": 38,
            "cost": 1416,
            "discount": 189,
            "self-closing": true
        },
        {
            "item_id": 1614,
            "invoice_id": 306,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 89,
            "cost": 1170,
            "discount": 555,
            "self-closing": true
        },
        {
            "item_id": 1615,
            "invoice_id": 267,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 55,
            "cost": 1038,
            "discount": 126,
            "self-closing": true
        },
        {
            "item_id": 1616,
            "invoice_id": 390,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 56,
            "cost": 1148,
            "discount": 145,
            "self-closing": true
        },
        {
            "item_id": 1617,
            "invoice_id": 332,
            "invoice_item_number": 4,
            "product_id": 29,
            "quantity": 71,
            "cost": 552,
            "discount": 551,
            "self-closing": true
        },
        {
            "item_id": 1618,
            "invoice_id": 234,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 76,
            "cost": 435,
            "discount": 16,
            "self-closing": true
        },
        {
            "item_id": 1619,
            "invoice_id": 74,
            "invoice_item_number": 5,
            "product_id": 22,
            "quantity": 80,
            "cost": 410,
            "discount": 257,
            "self-closing": true
        },
        {
            "item_id": 1620,
            "invoice_id": 312,
            "invoice_item_number": 7,
            "product_id": 8,
            "quantity": 25,
            "cost": 1170,
            "discount": 46,
            "self-closing": true
        },
        {
            "item_id": 1621,
            "invoice_id": 290,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 36,
            "cost": 1252,
            "discount": 337,
            "self-closing": true
        },
        {
            "item_id": 1622,
            "invoice_id": 91,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 94,
            "cost": 473,
            "discount": 792,
            "self-closing": true
        },
        {
            "item_id": 1623,
            "invoice_id": 246,
            "invoice_item_number": 5,
            "product_id": 10,
            "quantity": 92,
            "cost": 444,
            "discount": 332,
            "self-closing": true
        },
        {
            "item_id": 1624,
            "invoice_id": 104,
            "invoice_item_number": 5,
            "product_id": 19,
            "quantity": 74,
            "cost": 166,
            "discount": 547,
            "self-closing": true
        },
        {
            "item_id": 1625,
            "invoice_id": 383,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 75,
            "cost": 1266,
            "discount": 60,
            "self-closing": true
        },
        {
            "item_id": 1626,
            "invoice_id": 251,
            "invoice_item_number": 9,
            "product_id": 19,
            "quantity": 34,
            "cost": 546,
            "discount": 673,
            "self-closing": true
        },
        {
            "item_id": 1627,
            "invoice_id": 227,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 24,
            "cost": 1436,
            "discount": 459,
            "self-closing": true
        },
        {
            "item_id": 1628,
            "invoice_id": 228,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 55,
            "cost": 1256,
            "discount": 579,
            "self-closing": true
        },
        {
            "item_id": 1629,
            "invoice_id": 100,
            "invoice_item_number": 9,
            "product_id": 30,
            "quantity": 93,
            "cost": 352,
            "discount": 908,
            "self-closing": true
        },
        {
            "item_id": 1630,
            "invoice_id": 165,
            "invoice_item_number": 5,
            "product_id": 27,
            "quantity": 29,
            "cost": 717,
            "discount": 419,
            "self-closing": true
        },
        {
            "item_id": 1631,
            "invoice_id": 60,
            "invoice_item_number": 6,
            "product_id": 6,
            "quantity": 65,
            "cost": 694,
            "discount": 116,
            "self-closing": true
        },
        {
            "item_id": 1632,
            "invoice_id": 363,
            "invoice_item_number": 3,
            "product_id": 12,
            "quantity": 21,
            "cost": 210,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1633,
            "invoice_id": 222,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 12,
            "cost": 270,
            "discount": 806,
            "self-closing": true
        },
        {
            "item_id": 1634,
            "invoice_id": 49,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 55,
            "cost": 761,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1635,
            "invoice_id": 287,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 15,
            "cost": 1258,
            "discount": 482,
            "self-closing": true
        },
        {
            "item_id": 1636,
            "invoice_id": 325,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 20,
            "cost": 114,
            "discount": 370,
            "self-closing": true
        },
        {
            "item_id": 1637,
            "invoice_id": 336,
            "invoice_item_number": 2,
            "product_id": 3,
            "quantity": 88,
            "cost": 425,
            "discount": 24,
            "self-closing": true
        },
        {
            "item_id": 1638,
            "invoice_id": 20,
            "invoice_item_number": 7,
            "product_id": 27,
            "quantity": 26,
            "cost": 937,
            "discount": 659,
            "self-closing": true
        },
        {
            "item_id": 1639,
            "invoice_id": 336,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 22,
            "cost": 1218,
            "discount": 356,
            "self-closing": true
        },
        {
            "item_id": 1640,
            "invoice_id": 393,
            "invoice_item_number": 4,
            "product_id": 7,
            "quantity": 90,
            "cost": 33,
            "discount": 246,
            "self-closing": true
        },
        {
            "item_id": 1641,
            "invoice_id": 56,
            "invoice_item_number": 9,
            "product_id": 13,
            "quantity": 86,
            "cost": 892,
            "discount": 579,
            "self-closing": true
        },
        {
            "item_id": 1642,
            "invoice_id": 258,
            "invoice_item_number": 5,
            "product_id": 4,
            "quantity": 93,
            "cost": 65,
            "discount": 284,
            "self-closing": true
        },
        {
            "item_id": 1643,
            "invoice_id": 253,
            "invoice_item_number": 9,
            "product_id": 4,
            "quantity": 25,
            "cost": 765,
            "discount": 386,
            "self-closing": true
        },
        {
            "item_id": 1644,
            "invoice_id": 366,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 45,
            "cost": 4600,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1645,
            "invoice_id": 251,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 51,
            "cost": 259,
            "discount": 619,
            "self-closing": true
        },
        {
            "item_id": 1646,
            "invoice_id": 400,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 11,
            "cost": 459,
            "discount": 273,
            "self-closing": true
        },
        {
            "item_id": 1647,
            "invoice_id": 132,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 77,
            "cost": 449,
            "discount": 551,
            "self-closing": true
        },
        {
            "item_id": 1648,
            "invoice_id": 334,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 89,
            "cost": 1466,
            "discount": 348,
            "self-closing": true
        },
        {
            "item_id": 1649,
            "invoice_id": 246,
            "invoice_item_number": 6,
            "product_id": 16,
            "quantity": 85,
            "cost": 1226,
            "discount": 671,
            "self-closing": true
        },
        {
            "item_id": 1650,
            "invoice_id": 21,
            "invoice_item_number": 8,
            "product_id": 12,
            "quantity": 37,
            "cost": 68,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1651,
            "invoice_id": 262,
            "invoice_item_number": 3,
            "product_id": 2,
            "quantity": 94,
            "cost": 1318,
            "discount": 624,
            "self-closing": true
        },
        {
            "item_id": 1652,
            "invoice_id": 95,
            "invoice_item_number": 4,
            "product_id": 1,
            "quantity": 87,
            "cost": 645,
            "discount": 396,
            "self-closing": true
        },
        {
            "item_id": 1653,
            "invoice_id": 296,
            "invoice_item_number": 2,
            "product_id": 19,
            "quantity": 81,
            "cost": 1069,
            "discount": 133,
            "self-closing": true
        },
        {
            "item_id": 1654,
            "invoice_id": 1,
            "invoice_item_number": 2,
            "product_id": 26,
            "quantity": 34,
            "cost": 108,
            "discount": 605,
            "self-closing": true
        },
        {
            "item_id": 1655,
            "invoice_id": 363,
            "invoice_item_number": 6,
            "product_id": 25,
            "quantity": 32,
            "cost": 3200,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1656,
            "invoice_id": 296,
            "invoice_item_number": 9,
            "product_id": 28,
            "quantity": 31,
            "cost": 1436,
            "discount": 910,
            "self-closing": true
        },
        {
            "item_id": 1657,
            "invoice_id": 3,
            "invoice_item_number": 2,
            "product_id": 28,
            "quantity": 97,
            "cost": 1267,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1658,
            "invoice_id": 114,
            "invoice_item_number": 5,
            "product_id": 26,
            "quantity": 19,
            "cost": 1484,
            "discount": 454,
            "self-closing": true
        },
        {
            "item_id": 1659,
            "invoice_id": 322,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 35,
            "cost": 196,
            "discount": 136,
            "self-closing": true
        },
        {
            "item_id": 1660,
            "invoice_id": 268,
            "invoice_item_number": 8,
            "product_id": 2,
            "quantity": 43,
            "cost": 143,
            "discount": 786,
            "self-closing": true
        },
        {
            "item_id": 1661,
            "invoice_id": 179,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 73,
            "cost": 1496,
            "discount": 60,
            "self-closing": true
        },
        {
            "item_id": 1662,
            "invoice_id": 311,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 46,
            "cost": 1247,
            "discount": 390,
            "self-closing": true
        },
        {
            "item_id": 1663,
            "invoice_id": 324,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 62,
            "cost": 1241,
            "discount": 192,
            "self-closing": true
        },
        {
            "item_id": 1664,
            "invoice_id": 123,
            "invoice_item_number": 3,
            "product_id": 5,
            "quantity": 92,
            "cost": 938,
            "discount": 61,
            "self-closing": true
        },
        {
            "item_id": 1665,
            "invoice_id": 197,
            "invoice_item_number": 5,
            "product_id": 7,
            "quantity": 52,
            "cost": 563,
            "discount": 93,
            "self-closing": true
        },
        {
            "item_id": 1666,
            "invoice_id": 348,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 40,
            "cost": 696,
            "discount": 678,
            "self-closing": true
        },
        {
            "item_id": 1667,
            "invoice_id": 319,
            "invoice_item_number": 9,
            "product_id": 21,
            "quantity": 78,
            "cost": 782,
            "discount": 756,
            "self-closing": true
        },
        {
            "item_id": 1668,
            "invoice_id": 228,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 77,
            "cost": 755,
            "discount": 134,
            "self-closing": true
        },
        {
            "item_id": 1669,
            "invoice_id": 366,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 20,
            "cost": 2000,
            "discount": 200,
            "self-closing": true
        },
        {
            "item_id": 1670,
            "invoice_id": 253,
            "invoice_item_number": 8,
            "product_id": 2,
            "quantity": 15,
            "cost": 1394,
            "discount": 708,
            "self-closing": true
        },
        {
            "item_id": 1671,
            "invoice_id": 28,
            "invoice_item_number": 6,
            "product_id": 4,
            "quantity": 32,
            "cost": 45,
            "discount": 817,
            "self-closing": true
        },
        {
            "item_id": 1672,
            "invoice_id": 238,
            "invoice_item_number": 8,
            "product_id": 25,
            "quantity": 54,
            "cost": 469,
            "discount": 754,
            "self-closing": true
        },
        {
            "item_id": 1673,
            "invoice_id": 328,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 84,
            "cost": 538,
            "discount": 435,
            "self-closing": true
        },
        {
            "item_id": 1674,
            "invoice_id": 186,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 15,
            "cost": 1173,
            "discount": 823,
            "self-closing": true
        },
        {
            "item_id": 1675,
            "invoice_id": 293,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 36,
            "cost": 1078,
            "discount": 864,
            "self-closing": true
        },
        {
            "item_id": 1676,
            "invoice_id": 68,
            "invoice_item_number": 3,
            "product_id": 6,
            "quantity": 26,
            "cost": 1374,
            "discount": 584,
            "self-closing": true
        },
        {
            "item_id": 1677,
            "invoice_id": 363,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 71,
            "cost": 720,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1678,
            "invoice_id": 298,
            "invoice_item_number": 4,
            "product_id": 1,
            "quantity": 94,
            "cost": 1469,
            "discount": 865,
            "self-closing": true
        },
        {
            "item_id": 1679,
            "invoice_id": 109,
            "invoice_item_number": 7,
            "product_id": 4,
            "quantity": 55,
            "cost": 1480,
            "discount": 609,
            "self-closing": true
        },
        {
            "item_id": 1680,
            "invoice_id": 9,
            "invoice_item_number": 6,
            "product_id": 16,
            "quantity": 77,
            "cost": 380,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1681,
            "invoice_id": 299,
            "invoice_item_number": 5,
            "product_id": 11,
            "quantity": 69,
            "cost": 258,
            "discount": 779,
            "self-closing": true
        },
        {
            "item_id": 1682,
            "invoice_id": 381,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 62,
            "cost": 971,
            "discount": 993,
            "self-closing": true
        },
        {
            "item_id": 1683,
            "invoice_id": 322,
            "invoice_item_number": 9,
            "product_id": 1,
            "quantity": 84,
            "cost": 128,
            "discount": 626,
            "self-closing": true
        },
        {
            "item_id": 1684,
            "invoice_id": 134,
            "invoice_item_number": 6,
            "product_id": 30,
            "quantity": 77,
            "cost": 916,
            "discount": 688,
            "self-closing": true
        },
        {
            "item_id": 1685,
            "invoice_id": 377,
            "invoice_item_number": 6,
            "product_id": 25,
            "quantity": 58,
            "cost": 1487,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1686,
            "invoice_id": 63,
            "invoice_item_number": 2,
            "product_id": 24,
            "quantity": 72,
            "cost": 115,
            "discount": 71,
            "self-closing": true
        },
        {
            "item_id": 1687,
            "invoice_id": 304,
            "invoice_item_number": 3,
            "product_id": 25,
            "quantity": 95,
            "cost": 336,
            "discount": 913,
            "self-closing": true
        },
        {
            "item_id": 1688,
            "invoice_id": 262,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 11,
            "cost": 640,
            "discount": 75,
            "self-closing": true
        },
        {
            "item_id": 1689,
            "invoice_id": 179,
            "invoice_item_number": 9,
            "product_id": 8,
            "quantity": 48,
            "cost": 614,
            "discount": 841,
            "self-closing": true
        },
        {
            "item_id": 1690,
            "invoice_id": 355,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 53,
            "cost": 1008,
            "discount": 585,
            "self-closing": true
        },
        {
            "item_id": 1691,
            "invoice_id": 172,
            "invoice_item_number": 8,
            "product_id": 8,
            "quantity": 96,
            "cost": 471,
            "discount": 363,
            "self-closing": true
        },
        {
            "item_id": 1692,
            "invoice_id": 339,
            "invoice_item_number": 8,
            "product_id": 29,
            "quantity": 88,
            "cost": 80,
            "discount": 687,
            "self-closing": true
        },
        {
            "item_id": 1693,
            "invoice_id": 185,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 45,
            "cost": 135,
            "discount": 991,
            "self-closing": true
        },
        {
            "item_id": 1694,
            "invoice_id": 87,
            "invoice_item_number": 3,
            "product_id": 7,
            "quantity": 24,
            "cost": 1004,
            "discount": 607,
            "self-closing": true
        },
        {
            "item_id": 1695,
            "invoice_id": 366,
            "invoice_item_number": 4,
            "product_id": 14,
            "quantity": 20,
            "cost": 2500,
            "discount": 3000,
            "self-closing": true
        },
        {
            "item_id": 1696,
            "invoice_id": 366,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 10,
            "cost": 1000,
            "discount": 100,
            "self-closing": true
        },
        {
            "item_id": 1697,
            "invoice_id": 328,
            "invoice_item_number": 4,
            "product_id": 21,
            "quantity": 42,
            "cost": 446,
            "discount": 109,
            "self-closing": true
        },
        {
            "item_id": 1698,
            "invoice_id": 244,
            "invoice_item_number": 8,
            "product_id": 17,
            "quantity": 76,
            "cost": 325,
            "discount": 192,
            "self-closing": true
        },
        {
            "item_id": 1699,
            "invoice_id": 118,
            "invoice_item_number": 8,
            "product_id": 2,
            "quantity": 53,
            "cost": 372,
            "discount": 160,
            "self-closing": true
        },
        {
            "item_id": 1700,
            "invoice_id": 271,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 66,
            "cost": 1420,
            "discount": 652,
            "self-closing": true
        },
        {
            "item_id": 1701,
            "invoice_id": 323,
            "invoice_item_number": 4,
            "product_id": 11,
            "quantity": 20,
            "cost": 841,
            "discount": 481,
            "self-closing": true
        },
        {
            "item_id": 1702,
            "invoice_id": 320,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 94,
            "cost": 955,
            "discount": 508,
            "self-closing": true
        },
        {
            "item_id": 1703,
            "invoice_id": 245,
            "invoice_item_number": 2,
            "product_id": 30,
            "quantity": 68,
            "cost": 166,
            "discount": 791,
            "self-closing": true
        },
        {
            "item_id": 1704,
            "invoice_id": 360,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 63,
            "cost": 124,
            "discount": 995,
            "self-closing": true
        },
        {
            "item_id": 1705,
            "invoice_id": 116,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 35,
            "cost": 410,
            "discount": 350,
            "self-closing": true
        },
        {
            "item_id": 1706,
            "invoice_id": 184,
            "invoice_item_number": 5,
            "product_id": 28,
            "quantity": 40,
            "cost": 462,
            "discount": 226,
            "self-closing": true
        },
        {
            "item_id": 1707,
            "invoice_id": 381,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 31,
            "cost": 445,
            "discount": 180,
            "self-closing": true
        },
        {
            "item_id": 1708,
            "invoice_id": 133,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 36,
            "cost": 539,
            "discount": 205,
            "self-closing": true
        },
        {
            "item_id": 1709,
            "invoice_id": 277,
            "invoice_item_number": 3,
            "product_id": 23,
            "quantity": 54,
            "cost": 984,
            "discount": 78,
            "self-closing": true
        },
        {
            "item_id": 1710,
            "invoice_id": 67,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 15,
            "cost": 1221,
            "discount": 663,
            "self-closing": true
        },
        {
            "item_id": 1711,
            "invoice_id": 161,
            "invoice_item_number": 5,
            "product_id": 28,
            "quantity": 59,
            "cost": 846,
            "discount": 971,
            "self-closing": true
        },
        {
            "item_id": 1712,
            "invoice_id": 127,
            "invoice_item_number": 8,
            "product_id": 18,
            "quantity": 68,
            "cost": 608,
            "discount": 952,
            "self-closing": true
        },
        {
            "item_id": 1713,
            "invoice_id": 374,
            "invoice_item_number": 5,
            "product_id": 25,
            "quantity": 20,
            "cost": 764,
            "discount": 311,
            "self-closing": true
        },
        {
            "item_id": 1714,
            "invoice_id": 164,
            "invoice_item_number": 9,
            "product_id": 23,
            "quantity": 16,
            "cost": 734,
            "discount": 59,
            "self-closing": true
        },
        {
            "item_id": 1715,
            "invoice_id": 138,
            "invoice_item_number": 9,
            "product_id": 9,
            "quantity": 28,
            "cost": 1128,
            "discount": 194,
            "self-closing": true
        },
        {
            "item_id": 1716,
            "invoice_id": 389,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 77,
            "cost": 159,
            "discount": 989,
            "self-closing": true
        },
        {
            "item_id": 1717,
            "invoice_id": 368,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 51,
            "cost": 1099,
            "discount": 844,
            "self-closing": true
        },
        {
            "item_id": 1718,
            "invoice_id": 363,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 3,
            "cost": 1300,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1719,
            "invoice_id": 347,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 94,
            "cost": 856,
            "discount": 558,
            "self-closing": true
        },
        {
            "item_id": 1720,
            "invoice_id": 136,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 16,
            "cost": 1188,
            "discount": 319,
            "self-closing": true
        },
        {
            "item_id": 1721,
            "invoice_id": 357,
            "invoice_item_number": 6,
            "product_id": 17,
            "quantity": 45,
            "cost": 162,
            "discount": 544,
            "self-closing": true
        },
        {
            "item_id": 1722,
            "invoice_id": 106,
            "invoice_item_number": 4,
            "product_id": 4,
            "quantity": 93,
            "cost": 368,
            "discount": 190,
            "self-closing": true
        },
        {
            "item_id": 1723,
            "invoice_id": 317,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 70,
            "cost": 851,
            "discount": 639,
            "self-closing": true
        },
        {
            "item_id": 1724,
            "invoice_id": 20,
            "invoice_item_number": 5,
            "product_id": 10,
            "quantity": 40,
            "cost": 950,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1725,
            "invoice_id": 208,
            "invoice_item_number": 7,
            "product_id": 22,
            "quantity": 23,
            "cost": 996,
            "discount": 134,
            "self-closing": true
        },
        {
            "item_id": 1726,
            "invoice_id": 64,
            "invoice_item_number": 8,
            "product_id": 25,
            "quantity": 73,
            "cost": 1345,
            "discount": 612,
            "self-closing": true
        },
        {
            "item_id": 1727,
            "invoice_id": 191,
            "invoice_item_number": 4,
            "product_id": 16,
            "quantity": 68,
            "cost": 354,
            "discount": 242,
            "self-closing": true
        },
        {
            "item_id": 1728,
            "invoice_id": 281,
            "invoice_item_number": 8,
            "product_id": 5,
            "quantity": 47,
            "cost": 311,
            "discount": 409,
            "self-closing": true
        },
        {
            "item_id": 1729,
            "invoice_id": 400,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 46,
            "cost": 902,
            "discount": 303,
            "self-closing": true
        },
        {
            "item_id": 1730,
            "invoice_id": 113,
            "invoice_item_number": 2,
            "product_id": 8,
            "quantity": 97,
            "cost": 1285,
            "discount": 972,
            "self-closing": true
        },
        {
            "item_id": 1731,
            "invoice_id": 70,
            "invoice_item_number": 4,
            "product_id": 13,
            "quantity": 58,
            "cost": 90,
            "discount": 724,
            "self-closing": true
        },
        {
            "item_id": 1732,
            "invoice_id": 210,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 93,
            "cost": 905,
            "discount": 362,
            "self-closing": true
        },
        {
            "item_id": 1733,
            "invoice_id": 161,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 80,
            "cost": 1218,
            "discount": 833,
            "self-closing": true
        },
        {
            "item_id": 1734,
            "invoice_id": 231,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 87,
            "cost": 59,
            "discount": 356,
            "self-closing": true
        },
        {
            "item_id": 1735,
            "invoice_id": 199,
            "invoice_item_number": 4,
            "product_id": 6,
            "quantity": 87,
            "cost": 955,
            "discount": 735,
            "self-closing": true
        },
        {
            "item_id": 1736,
            "invoice_id": 130,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 62,
            "cost": 265,
            "discount": 210,
            "self-closing": true
        },
        {
            "item_id": 1737,
            "invoice_id": 372,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 78,
            "cost": 397,
            "discount": 211,
            "self-closing": true
        },
        {
            "item_id": 1738,
            "invoice_id": 372,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 50,
            "cost": 383,
            "discount": 93,
            "self-closing": true
        },
        {
            "item_id": 1739,
            "invoice_id": 217,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 94,
            "cost": 841,
            "discount": 948,
            "self-closing": true
        },
        {
            "item_id": 1740,
            "invoice_id": 229,
            "invoice_item_number": 5,
            "product_id": 20,
            "quantity": 17,
            "cost": 1328,
            "discount": 104,
            "self-closing": true
        },
        {
            "item_id": 1741,
            "invoice_id": 220,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 59,
            "cost": 869,
            "discount": 779,
            "self-closing": true
        },
        {
            "item_id": 1742,
            "invoice_id": 232,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 67,
            "cost": 1483,
            "discount": 424,
            "self-closing": true
        },
        {
            "item_id": 1743,
            "invoice_id": 32,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 55,
            "cost": 433,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1744,
            "invoice_id": 371,
            "invoice_item_number": 4,
            "product_id": 16,
            "quantity": 19,
            "cost": 605,
            "discount": 781,
            "self-closing": true
        },
        {
            "item_id": 1745,
            "invoice_id": 240,
            "invoice_item_number": 5,
            "product_id": 19,
            "quantity": 42,
            "cost": 1445,
            "discount": 658,
            "self-closing": true
        },
        {
            "item_id": 1746,
            "invoice_id": 200,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 32,
            "cost": 1166,
            "discount": 331,
            "self-closing": true
        },
        {
            "item_id": 1747,
            "invoice_id": 199,
            "invoice_item_number": 2,
            "product_id": 22,
            "quantity": 31,
            "cost": 1354,
            "discount": 993,
            "self-closing": true
        },
        {
            "item_id": 1748,
            "invoice_id": 15,
            "invoice_item_number": 5,
            "product_id": 19,
            "quantity": 26,
            "cost": 323,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1749,
            "invoice_id": 246,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 48,
            "cost": 1355,
            "discount": 520,
            "self-closing": true
        },
        {
            "item_id": 1750,
            "invoice_id": 338,
            "invoice_item_number": 8,
            "product_id": 24,
            "quantity": 99,
            "cost": 963,
            "discount": 150,
            "self-closing": true
        },
        {
            "item_id": 1751,
            "invoice_id": 346,
            "invoice_item_number": 8,
            "product_id": 18,
            "quantity": 47,
            "cost": 706,
            "discount": 969,
            "self-closing": true
        },
        {
            "item_id": 1752,
            "invoice_id": 310,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 90,
            "cost": 1363,
            "discount": 729,
            "self-closing": true
        },
        {
            "item_id": 1753,
            "invoice_id": 88,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 91,
            "cost": 408,
            "discount": 595,
            "self-closing": true
        },
        {
            "item_id": 1754,
            "invoice_id": 54,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 60,
            "cost": 1170,
            "discount": 978,
            "self-closing": true
        },
        {
            "item_id": 1755,
            "invoice_id": 180,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 16,
            "cost": 1033,
            "discount": 605,
            "self-closing": true
        },
        {
            "item_id": 1756,
            "invoice_id": 234,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 16,
            "cost": 1242,
            "discount": 257,
            "self-closing": true
        },
        {
            "item_id": 1757,
            "invoice_id": 49,
            "invoice_item_number": 2,
            "product_id": 18,
            "quantity": 73,
            "cost": 426,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1758,
            "invoice_id": 286,
            "invoice_item_number": 9,
            "product_id": 13,
            "quantity": 14,
            "cost": 1227,
            "discount": 952,
            "self-closing": true
        },
        {
            "item_id": 1759,
            "invoice_id": 174,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 44,
            "cost": 1067,
            "discount": 28,
            "self-closing": true
        },
        {
            "item_id": 1760,
            "invoice_id": 321,
            "invoice_item_number": 8,
            "product_id": 29,
            "quantity": 51,
            "cost": 178,
            "discount": 704,
            "self-closing": true
        },
        {
            "item_id": 1761,
            "invoice_id": 109,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 52,
            "cost": 1110,
            "discount": 743,
            "self-closing": true
        },
        {
            "item_id": 1762,
            "invoice_id": 347,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 65,
            "cost": 478,
            "discount": 35,
            "self-closing": true
        },
        {
            "item_id": 1763,
            "invoice_id": 385,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 91,
            "cost": 425,
            "discount": 570,
            "self-closing": true
        },
        {
            "item_id": 1764,
            "invoice_id": 201,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 64,
            "cost": 1378,
            "discount": 771,
            "self-closing": true
        },
        {
            "item_id": 1765,
            "invoice_id": 366,
            "invoice_item_number": 6,
            "product_id": 26,
            "quantity": 90,
            "cost": 10000,
            "discount": 1200,
            "self-closing": true
        },
        {
            "item_id": 1766,
            "invoice_id": 341,
            "invoice_item_number": 2,
            "product_id": 22,
            "quantity": 52,
            "cost": 1249,
            "discount": 413,
            "self-closing": true
        },
        {
            "item_id": 1767,
            "invoice_id": 376,
            "invoice_item_number": 6,
            "product_id": 25,
            "quantity": 51,
            "cost": 445,
            "discount": 854,
            "self-closing": true
        },
        {
            "item_id": 1768,
            "invoice_id": 201,
            "invoice_item_number": 9,
            "product_id": 19,
            "quantity": 47,
            "cost": 895,
            "discount": 702,
            "self-closing": true
        },
        {
            "item_id": 1769,
            "invoice_id": 303,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 28,
            "cost": 92,
            "discount": 976,
            "self-closing": true
        },
        {
            "item_id": 1770,
            "invoice_id": 67,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 76,
            "cost": 1252,
            "discount": 966,
            "self-closing": true
        },
        {
            "item_id": 1771,
            "invoice_id": 85,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 68,
            "cost": 76,
            "discount": 535,
            "self-closing": true
        },
        {
            "item_id": 1772,
            "invoice_id": 326,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 87,
            "cost": 1202,
            "discount": 576,
            "self-closing": true
        },
        {
            "item_id": 1773,
            "invoice_id": 154,
            "invoice_item_number": 1,
            "product_id": 28,
            "quantity": 39,
            "cost": 1440,
            "discount": 75,
            "self-closing": true
        },
        {
            "item_id": 1774,
            "invoice_id": 215,
            "invoice_item_number": 6,
            "product_id": 18,
            "quantity": 38,
            "cost": 1282,
            "discount": 622,
            "self-closing": true
        },
        {
            "item_id": 1775,
            "invoice_id": 163,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 29,
            "cost": 1050,
            "discount": 857,
            "self-closing": true
        },
        {
            "item_id": 1776,
            "invoice_id": 184,
            "invoice_item_number": 8,
            "product_id": 30,
            "quantity": 70,
            "cost": 492,
            "discount": 946,
            "self-closing": true
        },
        {
            "item_id": 1777,
            "invoice_id": 244,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 36,
            "cost": 141,
            "discount": 156,
            "self-closing": true
        },
        {
            "item_id": 1778,
            "invoice_id": 304,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 59,
            "cost": 821,
            "discount": 974,
            "self-closing": true
        },
        {
            "item_id": 1779,
            "invoice_id": 190,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 24,
            "cost": 867,
            "discount": 26,
            "self-closing": true
        },
        {
            "item_id": 1780,
            "invoice_id": 72,
            "invoice_item_number": 4,
            "product_id": 10,
            "quantity": 95,
            "cost": 1461,
            "discount": 617,
            "self-closing": true
        },
        {
            "item_id": 1781,
            "invoice_id": 148,
            "invoice_item_number": 4,
            "product_id": 4,
            "quantity": 33,
            "cost": 321,
            "discount": 295,
            "self-closing": true
        },
        {
            "item_id": 1782,
            "invoice_id": 149,
            "invoice_item_number": 7,
            "product_id": 21,
            "quantity": 89,
            "cost": 823,
            "discount": 453,
            "self-closing": true
        },
        {
            "item_id": 1783,
            "invoice_id": 223,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 74,
            "cost": 261,
            "discount": 234,
            "self-closing": true
        },
        {
            "item_id": 1784,
            "invoice_id": 388,
            "invoice_item_number": 5,
            "product_id": 24,
            "quantity": 43,
            "cost": 649,
            "discount": 574,
            "self-closing": true
        },
        {
            "item_id": 1785,
            "invoice_id": 193,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 35,
            "cost": 543,
            "discount": 298,
            "self-closing": true
        },
        {
            "item_id": 1786,
            "invoice_id": 238,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 46,
            "cost": 1204,
            "discount": 896,
            "self-closing": true
        },
        {
            "item_id": 1787,
            "invoice_id": 358,
            "invoice_item_number": 8,
            "product_id": 22,
            "quantity": 37,
            "cost": 864,
            "discount": 267,
            "self-closing": true
        },
        {
            "item_id": 1788,
            "invoice_id": 275,
            "invoice_item_number": 9,
            "product_id": 8,
            "quantity": 21,
            "cost": 1322,
            "discount": 637,
            "self-closing": true
        },
        {
            "item_id": 1789,
            "invoice_id": 14,
            "invoice_item_number": 2,
            "product_id": 21,
            "quantity": 39,
            "cost": 1488,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1790,
            "invoice_id": 348,
            "invoice_item_number": 9,
            "product_id": 2,
            "quantity": 86,
            "cost": 744,
            "discount": 552,
            "self-closing": true
        },
        {
            "item_id": 1791,
            "invoice_id": 211,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 76,
            "cost": 782,
            "discount": 151,
            "self-closing": true
        },
        {
            "item_id": 1792,
            "invoice_id": 254,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 19,
            "cost": 813,
            "discount": 851,
            "self-closing": true
        },
        {
            "item_id": 1793,
            "invoice_id": 22,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 22,
            "cost": 1190,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1794,
            "invoice_id": 333,
            "invoice_item_number": 3,
            "product_id": 8,
            "quantity": 52,
            "cost": 194,
            "discount": 112,
            "self-closing": true
        },
        {
            "item_id": 1795,
            "invoice_id": 217,
            "invoice_item_number": 8,
            "product_id": 30,
            "quantity": 60,
            "cost": 716,
            "discount": 631,
            "self-closing": true
        },
        {
            "item_id": 1796,
            "invoice_id": 321,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 34,
            "cost": 1405,
            "discount": 628,
            "self-closing": true
        },
        {
            "item_id": 1797,
            "invoice_id": 181,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 100,
            "cost": 1026,
            "discount": 871,
            "self-closing": true
        },
        {
            "item_id": 1798,
            "invoice_id": 259,
            "invoice_item_number": 7,
            "product_id": 29,
            "quantity": 47,
            "cost": 1071,
            "discount": 674,
            "self-closing": true
        },
        {
            "item_id": 1799,
            "invoice_id": 4,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 33,
            "cost": 1280,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1800,
            "invoice_id": 276,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 81,
            "cost": 1405,
            "discount": 68,
            "self-closing": true
        },
        {
            "item_id": 1801,
            "invoice_id": 282,
            "invoice_item_number": 9,
            "product_id": 8,
            "quantity": 16,
            "cost": 119,
            "discount": 20,
            "self-closing": true
        },
        {
            "item_id": 1802,
            "invoice_id": 337,
            "invoice_item_number": 9,
            "product_id": 5,
            "quantity": 66,
            "cost": 611,
            "discount": 803,
            "self-closing": true
        },
        {
            "item_id": 1803,
            "invoice_id": 227,
            "invoice_item_number": 9,
            "product_id": 18,
            "quantity": 21,
            "cost": 479,
            "discount": 879,
            "self-closing": true
        },
        {
            "item_id": 1804,
            "invoice_id": 70,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 64,
            "cost": 622,
            "discount": 80,
            "self-closing": true
        },
        {
            "item_id": 1805,
            "invoice_id": 20,
            "invoice_item_number": 4,
            "product_id": 25,
            "quantity": 33,
            "cost": 611,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1806,
            "invoice_id": 14,
            "invoice_item_number": 1,
            "product_id": 30,
            "quantity": 12,
            "cost": 768,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1807,
            "invoice_id": 50,
            "invoice_item_number": 3,
            "product_id": 2,
            "quantity": 44,
            "cost": 1059,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1808,
            "invoice_id": 363,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 70,
            "cost": 300,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1809,
            "invoice_id": 115,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 35,
            "cost": 1168,
            "discount": 507,
            "self-closing": true
        },
        {
            "item_id": 1810,
            "invoice_id": 60,
            "invoice_item_number": 9,
            "product_id": 16,
            "quantity": 84,
            "cost": 1334,
            "discount": 895,
            "self-closing": true
        },
        {
            "item_id": 1811,
            "invoice_id": 377,
            "invoice_item_number": 2,
            "product_id": 8,
            "quantity": 91,
            "cost": 639,
            "discount": 54,
            "self-closing": true
        },
        {
            "item_id": 1812,
            "invoice_id": 50,
            "invoice_item_number": 9,
            "product_id": 26,
            "quantity": 28,
            "cost": 759,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1813,
            "invoice_id": 90,
            "invoice_item_number": 5,
            "product_id": 4,
            "quantity": 37,
            "cost": 448,
            "discount": 677,
            "self-closing": true
        },
        {
            "item_id": 1814,
            "invoice_id": 187,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 27,
            "cost": 657,
            "discount": 553,
            "self-closing": true
        },
        {
            "item_id": 1815,
            "invoice_id": 253,
            "invoice_item_number": 8,
            "product_id": 2,
            "quantity": 28,
            "cost": 1221,
            "discount": 675,
            "self-closing": true
        },
        {
            "item_id": 1816,
            "invoice_id": 137,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 31,
            "cost": 194,
            "discount": 574,
            "self-closing": true
        },
        {
            "item_id": 1817,
            "invoice_id": 114,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 99,
            "cost": 628,
            "discount": 514,
            "self-closing": true
        },
        {
            "item_id": 1818,
            "invoice_id": 297,
            "invoice_item_number": 4,
            "product_id": 7,
            "quantity": 16,
            "cost": 588,
            "discount": 536,
            "self-closing": true
        },
        {
            "item_id": 1819,
            "invoice_id": 184,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 33,
            "cost": 967,
            "discount": 555,
            "self-closing": true
        },
        {
            "item_id": 1820,
            "invoice_id": 221,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 32,
            "cost": 1266,
            "discount": 848,
            "self-closing": true
        },
        {
            "item_id": 1821,
            "invoice_id": 332,
            "invoice_item_number": 5,
            "product_id": 16,
            "quantity": 34,
            "cost": 617,
            "discount": 903,
            "self-closing": true
        },
        {
            "item_id": 1822,
            "invoice_id": 299,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 24,
            "cost": 776,
            "discount": 189,
            "self-closing": true
        },
        {
            "item_id": 1823,
            "invoice_id": 364,
            "invoice_item_number": 2,
            "product_id": 6,
            "quantity": 95,
            "cost": 695,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1824,
            "invoice_id": 93,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 20,
            "cost": 1217,
            "discount": 374,
            "self-closing": true
        },
        {
            "item_id": 1825,
            "invoice_id": 89,
            "invoice_item_number": 7,
            "product_id": 30,
            "quantity": 70,
            "cost": 360,
            "discount": 32,
            "self-closing": true
        },
        {
            "item_id": 1826,
            "invoice_id": 123,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 51,
            "cost": 1274,
            "discount": 607,
            "self-closing": true
        },
        {
            "item_id": 1827,
            "invoice_id": 364,
            "invoice_item_number": 5,
            "product_id": 26,
            "quantity": 2,
            "cost": 28,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1828,
            "invoice_id": 161,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 10,
            "cost": 987,
            "discount": 846,
            "self-closing": true
        },
        {
            "item_id": 1829,
            "invoice_id": 180,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 60,
            "cost": 751,
            "discount": 244,
            "self-closing": true
        },
        {
            "item_id": 1830,
            "invoice_id": 364,
            "invoice_item_number": 4,
            "product_id": 16,
            "quantity": 6,
            "cost": 64,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1831,
            "invoice_id": 349,
            "invoice_item_number": 8,
            "product_id": 24,
            "quantity": 45,
            "cost": 1429,
            "discount": 894,
            "self-closing": true
        },
        {
            "item_id": 1832,
            "invoice_id": 341,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 53,
            "cost": 899,
            "discount": 768,
            "self-closing": true
        },
        {
            "item_id": 1833,
            "invoice_id": 126,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 65,
            "cost": 753,
            "discount": 355,
            "self-closing": true
        },
        {
            "item_id": 1834,
            "invoice_id": 250,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 86,
            "cost": 292,
            "discount": 124,
            "self-closing": true
        },
        {
            "item_id": 1835,
            "invoice_id": 236,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 88,
            "cost": 1129,
            "discount": 194,
            "self-closing": true
        },
        {
            "item_id": 1836,
            "invoice_id": 317,
            "invoice_item_number": 5,
            "product_id": 7,
            "quantity": 88,
            "cost": 1179,
            "discount": 940,
            "self-closing": true
        },
        {
            "item_id": 1837,
            "invoice_id": 230,
            "invoice_item_number": 8,
            "product_id": 9,
            "quantity": 25,
            "cost": 285,
            "discount": 861,
            "self-closing": true
        },
        {
            "item_id": 1838,
            "invoice_id": 329,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 34,
            "cost": 64,
            "discount": 647,
            "self-closing": true
        },
        {
            "item_id": 1839,
            "invoice_id": 57,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 12,
            "cost": 1210,
            "discount": 966,
            "self-closing": true
        },
        {
            "item_id": 1840,
            "invoice_id": 397,
            "invoice_item_number": 2,
            "product_id": 5,
            "quantity": 27,
            "cost": 1229,
            "discount": 952,
            "self-closing": true
        },
        {
            "item_id": 1841,
            "invoice_id": 265,
            "invoice_item_number": 6,
            "product_id": 8,
            "quantity": 91,
            "cost": 1258,
            "discount": 259,
            "self-closing": true
        },
        {
            "item_id": 1842,
            "invoice_id": 372,
            "invoice_item_number": 2,
            "product_id": 7,
            "quantity": 61,
            "cost": 1187,
            "discount": 332,
            "self-closing": true
        },
        {
            "item_id": 1843,
            "invoice_id": 49,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 83,
            "cost": 1013,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1844,
            "invoice_id": 380,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 47,
            "cost": 1347,
            "discount": 774,
            "self-closing": true
        },
        {
            "item_id": 1845,
            "invoice_id": 181,
            "invoice_item_number": 9,
            "product_id": 29,
            "quantity": 15,
            "cost": 1418,
            "discount": 552,
            "self-closing": true
        },
        {
            "item_id": 1846,
            "invoice_id": 282,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 79,
            "cost": 1415,
            "discount": 684,
            "self-closing": true
        },
        {
            "item_id": 1847,
            "invoice_id": 364,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 72,
            "cost": 1772,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1848,
            "invoice_id": 320,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 15,
            "cost": 733,
            "discount": 440,
            "self-closing": true
        },
        {
            "item_id": 1849,
            "invoice_id": 309,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 12,
            "cost": 98,
            "discount": 255,
            "self-closing": true
        },
        {
            "item_id": 1850,
            "invoice_id": 332,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 32,
            "cost": 929,
            "discount": 469,
            "self-closing": true
        },
        {
            "item_id": 1851,
            "invoice_id": 355,
            "invoice_item_number": 8,
            "product_id": 26,
            "quantity": 42,
            "cost": 921,
            "discount": 788,
            "self-closing": true
        },
        {
            "item_id": 1852,
            "invoice_id": 336,
            "invoice_item_number": 3,
            "product_id": 7,
            "quantity": 77,
            "cost": 969,
            "discount": 501,
            "self-closing": true
        },
        {
            "item_id": 1853,
            "invoice_id": 393,
            "invoice_item_number": 6,
            "product_id": 14,
            "quantity": 99,
            "cost": 1021,
            "discount": 191,
            "self-closing": true
        },
        {
            "item_id": 1854,
            "invoice_id": 400,
            "invoice_item_number": 4,
            "product_id": 13,
            "quantity": 16,
            "cost": 645,
            "discount": 208,
            "self-closing": true
        },
        {
            "item_id": 1855,
            "invoice_id": 57,
            "invoice_item_number": 8,
            "product_id": 17,
            "quantity": 77,
            "cost": 1145,
            "discount": 946,
            "self-closing": true
        },
        {
            "item_id": 1856,
            "invoice_id": 28,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 35,
            "cost": 432,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1857,
            "invoice_id": 364,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 8,
            "cost": 89,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1858,
            "invoice_id": 144,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 86,
            "cost": 1340,
            "discount": 27,
            "self-closing": true
        },
        {
            "item_id": 1859,
            "invoice_id": 316,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 66,
            "cost": 825,
            "discount": 437,
            "self-closing": true
        },
        {
            "item_id": 1860,
            "invoice_id": 347,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 56,
            "cost": 1246,
            "discount": 384,
            "self-closing": true
        },
        {
            "item_id": 1861,
            "invoice_id": 114,
            "invoice_item_number": 8,
            "product_id": 1,
            "quantity": 15,
            "cost": 1485,
            "discount": 492,
            "self-closing": true
        },
        {
            "item_id": 1862,
            "invoice_id": 85,
            "invoice_item_number": 2,
            "product_id": 22,
            "quantity": 94,
            "cost": 482,
            "discount": 93,
            "self-closing": true
        },
        {
            "item_id": 1863,
            "invoice_id": 282,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 33,
            "cost": 1384,
            "discount": 371,
            "self-closing": true
        },
        {
            "item_id": 1864,
            "invoice_id": 197,
            "invoice_item_number": 6,
            "product_id": 26,
            "quantity": 95,
            "cost": 123,
            "discount": 890,
            "self-closing": true
        },
        {
            "item_id": 1865,
            "invoice_id": 364,
            "invoice_item_number": 3,
            "product_id": 23,
            "quantity": 9,
            "cost": 139,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1866,
            "invoice_id": 9,
            "invoice_item_number": 3,
            "product_id": 15,
            "quantity": 58,
            "cost": 108,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1867,
            "invoice_id": 387,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 24,
            "cost": 95,
            "discount": 111,
            "self-closing": true
        },
        {
            "item_id": 1868,
            "invoice_id": 94,
            "invoice_item_number": 4,
            "product_id": 25,
            "quantity": 27,
            "cost": 62,
            "discount": 816,
            "self-closing": true
        },
        {
            "item_id": 1869,
            "invoice_id": 178,
            "invoice_item_number": 7,
            "product_id": 29,
            "quantity": 38,
            "cost": 715,
            "discount": 508,
            "self-closing": true
        },
        {
            "item_id": 1870,
            "invoice_id": 394,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 14,
            "cost": 211,
            "discount": 944,
            "self-closing": true
        },
        {
            "item_id": 1871,
            "invoice_id": 148,
            "invoice_item_number": 5,
            "product_id": 28,
            "quantity": 45,
            "cost": 1295,
            "discount": 957,
            "self-closing": true
        },
        {
            "item_id": 1872,
            "invoice_id": 349,
            "invoice_item_number": 6,
            "product_id": 14,
            "quantity": 86,
            "cost": 815,
            "discount": 162,
            "self-closing": true
        },
        {
            "item_id": 1873,
            "invoice_id": 163,
            "invoice_item_number": 2,
            "product_id": 19,
            "quantity": 61,
            "cost": 215,
            "discount": 843,
            "self-closing": true
        },
        {
            "item_id": 1874,
            "invoice_id": 372,
            "invoice_item_number": 4,
            "product_id": 28,
            "quantity": 45,
            "cost": 176,
            "discount": 396,
            "self-closing": true
        },
        {
            "item_id": 1875,
            "invoice_id": 257,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 27,
            "cost": 1447,
            "discount": 649,
            "self-closing": true
        },
        {
            "item_id": 1876,
            "invoice_id": 57,
            "invoice_item_number": 7,
            "product_id": 29,
            "quantity": 80,
            "cost": 528,
            "discount": 960,
            "self-closing": true
        },
        {
            "item_id": 1877,
            "invoice_id": 7,
            "invoice_item_number": 7,
            "product_id": 29,
            "quantity": 61,
            "cost": 1050,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1878,
            "invoice_id": 152,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 97,
            "cost": 1148,
            "discount": 74,
            "self-closing": true
        },
        {
            "item_id": 1879,
            "invoice_id": 179,
            "invoice_item_number": 8,
            "product_id": 5,
            "quantity": 83,
            "cost": 969,
            "discount": 441,
            "self-closing": true
        },
        {
            "item_id": 1880,
            "invoice_id": 279,
            "invoice_item_number": 4,
            "product_id": 4,
            "quantity": 74,
            "cost": 516,
            "discount": 232,
            "self-closing": true
        },
        {
            "item_id": 1881,
            "invoice_id": 58,
            "invoice_item_number": 8,
            "product_id": 30,
            "quantity": 14,
            "cost": 675,
            "discount": 340,
            "self-closing": true
        },
        {
            "item_id": 1882,
            "invoice_id": 263,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 45,
            "cost": 442,
            "discount": 647,
            "self-closing": true
        },
        {
            "item_id": 1883,
            "invoice_id": 364,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 59,
            "cost": 590,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1884,
            "invoice_id": 177,
            "invoice_item_number": 9,
            "product_id": 6,
            "quantity": 27,
            "cost": 478,
            "discount": 106,
            "self-closing": true
        },
        {
            "item_id": 1885,
            "invoice_id": 5,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 61,
            "cost": 1405,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1886,
            "invoice_id": 15,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 13,
            "cost": 645,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1887,
            "invoice_id": 267,
            "invoice_item_number": 3,
            "product_id": 14,
            "quantity": 74,
            "cost": 1212,
            "discount": 16,
            "self-closing": true
        },
        {
            "item_id": 1888,
            "invoice_id": 233,
            "invoice_item_number": 3,
            "product_id": 26,
            "quantity": 75,
            "cost": 1292,
            "discount": 660,
            "self-closing": true
        },
        {
            "item_id": 1889,
            "invoice_id": 96,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 25,
            "cost": 980,
            "discount": 461,
            "self-closing": true
        },
        {
            "item_id": 1890,
            "invoice_id": 278,
            "invoice_item_number": 8,
            "product_id": 11,
            "quantity": 83,
            "cost": 812,
            "discount": 29,
            "self-closing": true
        },
        {
            "item_id": 1891,
            "invoice_id": 388,
            "invoice_item_number": 4,
            "product_id": 6,
            "quantity": 81,
            "cost": 1140,
            "discount": 171,
            "self-closing": true
        },
        {
            "item_id": 1892,
            "invoice_id": 338,
            "invoice_item_number": 4,
            "product_id": 26,
            "quantity": 61,
            "cost": 525,
            "discount": 75,
            "self-closing": true
        },
        {
            "item_id": 1893,
            "invoice_id": 206,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 76,
            "cost": 565,
            "discount": 455,
            "self-closing": true
        },
        {
            "item_id": 1894,
            "invoice_id": 337,
            "invoice_item_number": 7,
            "product_id": 23,
            "quantity": 83,
            "cost": 1283,
            "discount": 978,
            "self-closing": true
        },
        {
            "item_id": 1895,
            "invoice_id": 364,
            "invoice_item_number": 1,
            "product_id": 2,
            "quantity": 116,
            "cost": 1216,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1896,
            "invoice_id": 173,
            "invoice_item_number": 9,
            "product_id": 26,
            "quantity": 90,
            "cost": 1284,
            "discount": 558,
            "self-closing": true
        },
        {
            "item_id": 1897,
            "invoice_id": 375,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 37,
            "cost": 870,
            "discount": 365,
            "self-closing": true
        },
        {
            "item_id": 1898,
            "invoice_id": 124,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 28,
            "cost": 1451,
            "discount": 516,
            "self-closing": true
        },
        {
            "item_id": 1899,
            "invoice_id": 124,
            "invoice_item_number": 9,
            "product_id": 5,
            "quantity": 81,
            "cost": 350,
            "discount": 321,
            "self-closing": true
        },
        {
            "item_id": 1900,
            "invoice_id": 399,
            "invoice_item_number": 2,
            "product_id": 12,
            "quantity": 45,
            "cost": 889,
            "discount": 360,
            "self-closing": true
        },
        {
            "item_id": 1901,
            "invoice_id": 303,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 34,
            "cost": 1087,
            "discount": 461,
            "self-closing": true
        },
        {
            "item_id": 1902,
            "invoice_id": 154,
            "invoice_item_number": 2,
            "product_id": 26,
            "quantity": 64,
            "cost": 1385,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1903,
            "invoice_id": 148,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 20,
            "cost": 1082,
            "discount": 265,
            "self-closing": true
        },
        {
            "item_id": 1904,
            "invoice_id": 261,
            "invoice_item_number": 3,
            "product_id": 25,
            "quantity": 25,
            "cost": 653,
            "discount": 817,
            "self-closing": true
        },
        {
            "item_id": 1905,
            "invoice_id": 289,
            "invoice_item_number": 7,
            "product_id": 16,
            "quantity": 55,
            "cost": 145,
            "discount": 687,
            "self-closing": true
        },
        {
            "item_id": 1906,
            "invoice_id": 351,
            "invoice_item_number": 2,
            "product_id": 4,
            "quantity": 53,
            "cost": 654,
            "discount": 156,
            "self-closing": true
        },
        {
            "item_id": 1907,
            "invoice_id": 112,
            "invoice_item_number": 6,
            "product_id": 30,
            "quantity": 60,
            "cost": 1362,
            "discount": 163,
            "self-closing": true
        },
        {
            "item_id": 1908,
            "invoice_id": 352,
            "invoice_item_number": 9,
            "product_id": 9,
            "quantity": 71,
            "cost": 1414,
            "discount": 515,
            "self-closing": true
        },
        {
            "item_id": 1909,
            "invoice_id": 31,
            "invoice_item_number": 5,
            "product_id": 4,
            "quantity": 89,
            "cost": 1063,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1910,
            "invoice_id": 150,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 25,
            "cost": 254,
            "discount": 490,
            "self-closing": true
        },
        {
            "item_id": 1911,
            "invoice_id": 400,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 27,
            "cost": 1141,
            "discount": 567,
            "self-closing": true
        },
        {
            "item_id": 1912,
            "invoice_id": 26,
            "invoice_item_number": 7,
            "product_id": 2,
            "quantity": 81,
            "cost": 870,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1913,
            "invoice_id": 129,
            "invoice_item_number": 7,
            "product_id": 12,
            "quantity": 40,
            "cost": 715,
            "discount": 975,
            "self-closing": true
        },
        {
            "item_id": 1914,
            "invoice_id": 279,
            "invoice_item_number": 8,
            "product_id": 26,
            "quantity": 55,
            "cost": 895,
            "discount": 245,
            "self-closing": true
        },
        {
            "item_id": 1915,
            "invoice_id": 389,
            "invoice_item_number": 7,
            "product_id": 28,
            "quantity": 21,
            "cost": 69,
            "discount": 436,
            "self-closing": true
        },
        {
            "item_id": 1916,
            "invoice_id": 194,
            "invoice_item_number": 7,
            "product_id": 28,
            "quantity": 20,
            "cost": 1325,
            "discount": 938,
            "self-closing": true
        },
        {
            "item_id": 1917,
            "invoice_id": 365,
            "invoice_item_number": 1,
            "product_id": 1,
            "quantity": 5,
            "cost": 1500,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1918,
            "invoice_id": 188,
            "invoice_item_number": 6,
            "product_id": 6,
            "quantity": 80,
            "cost": 227,
            "discount": 350,
            "self-closing": true
        },
        {
            "item_id": 1919,
            "invoice_id": 248,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 11,
            "cost": 1418,
            "discount": 712,
            "self-closing": true
        },
        {
            "item_id": 1920,
            "invoice_id": 127,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 86,
            "cost": 512,
            "discount": 276,
            "self-closing": true
        },
        {
            "item_id": 1921,
            "invoice_id": 386,
            "invoice_item_number": 3,
            "product_id": 13,
            "quantity": 69,
            "cost": 677,
            "discount": 449,
            "self-closing": true
        },
        {
            "item_id": 1922,
            "invoice_id": 198,
            "invoice_item_number": 8,
            "product_id": 26,
            "quantity": 80,
            "cost": 840,
            "discount": 538,
            "self-closing": true
        },
        {
            "item_id": 1923,
            "invoice_id": 178,
            "invoice_item_number": 8,
            "product_id": 8,
            "quantity": 85,
            "cost": 601,
            "discount": 625,
            "self-closing": true
        },
        {
            "item_id": 1924,
            "invoice_id": 259,
            "invoice_item_number": 9,
            "product_id": 18,
            "quantity": 72,
            "cost": 129,
            "discount": 584,
            "self-closing": true
        },
        {
            "item_id": 1925,
            "invoice_id": 123,
            "invoice_item_number": 6,
            "product_id": 13,
            "quantity": 57,
            "cost": 876,
            "discount": 628,
            "self-closing": true
        },
        {
            "item_id": 1926,
            "invoice_id": 341,
            "invoice_item_number": 9,
            "product_id": 19,
            "quantity": 16,
            "cost": 401,
            "discount": 304,
            "self-closing": true
        },
        {
            "item_id": 1927,
            "invoice_id": 164,
            "invoice_item_number": 6,
            "product_id": 30,
            "quantity": 10,
            "cost": 717,
            "discount": 309,
            "self-closing": true
        },
        {
            "item_id": 1928,
            "invoice_id": 147,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 45,
            "cost": 258,
            "discount": 290,
            "self-closing": true
        },
        {
            "item_id": 1929,
            "invoice_id": 368,
            "invoice_item_number": 7,
            "product_id": 12,
            "quantity": 88,
            "cost": 121,
            "discount": 878,
            "self-closing": true
        },
        {
            "item_id": 1930,
            "invoice_id": 303,
            "invoice_item_number": 6,
            "product_id": 17,
            "quantity": 18,
            "cost": 833,
            "discount": 515,
            "self-closing": true
        },
        {
            "item_id": 1931,
            "invoice_id": 258,
            "invoice_item_number": 6,
            "product_id": 24,
            "quantity": 28,
            "cost": 469,
            "discount": 441,
            "self-closing": true
        },
        {
            "item_id": 1932,
            "invoice_id": 349,
            "invoice_item_number": 4,
            "product_id": 25,
            "quantity": 11,
            "cost": 1357,
            "discount": 821,
            "self-closing": true
        },
        {
            "item_id": 1933,
            "invoice_id": 185,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 63,
            "cost": 104,
            "discount": 543,
            "self-closing": true
        },
        {
            "item_id": 1934,
            "invoice_id": 353,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 84,
            "cost": 1443,
            "discount": 255,
            "self-closing": true
        },
        {
            "item_id": 1935,
            "invoice_id": 319,
            "invoice_item_number": 3,
            "product_id": 27,
            "quantity": 85,
            "cost": 296,
            "discount": 354,
            "self-closing": true
        },
        {
            "item_id": 1936,
            "invoice_id": 397,
            "invoice_item_number": 4,
            "product_id": 9,
            "quantity": 40,
            "cost": 1287,
            "discount": 643,
            "self-closing": true
        },
        {
            "item_id": 1937,
            "invoice_id": 33,
            "invoice_item_number": 6,
            "product_id": 16,
            "quantity": 23,
            "cost": 518,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1938,
            "invoice_id": 176,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 99,
            "cost": 198,
            "discount": 932,
            "self-closing": true
        },
        {
            "item_id": 1939,
            "invoice_id": 243,
            "invoice_item_number": 7,
            "product_id": 26,
            "quantity": 63,
            "cost": 569,
            "discount": 717,
            "self-closing": true
        },
        {
            "item_id": 1940,
            "invoice_id": 365,
            "invoice_item_number": 3,
            "product_id": 3,
            "quantity": 95,
            "cost": 935,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1941,
            "invoice_id": 242,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 66,
            "cost": 491,
            "discount": 903,
            "self-closing": true
        },
        {
            "item_id": 1942,
            "invoice_id": 72,
            "invoice_item_number": 9,
            "product_id": 22,
            "quantity": 14,
            "cost": 1190,
            "discount": 550,
            "self-closing": true
        },
        {
            "item_id": 1943,
            "invoice_id": 228,
            "invoice_item_number": 1,
            "product_id": 18,
            "quantity": 12,
            "cost": 760,
            "discount": 121,
            "self-closing": true
        },
        {
            "item_id": 1944,
            "invoice_id": 365,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 80,
            "cost": 3038,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1945,
            "invoice_id": 86,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 85,
            "cost": 279,
            "discount": 814,
            "self-closing": true
        },
        {
            "item_id": 1946,
            "invoice_id": 221,
            "invoice_item_number": 4,
            "product_id": 10,
            "quantity": 77,
            "cost": 1456,
            "discount": 766,
            "self-closing": true
        },
        {
            "item_id": 1947,
            "invoice_id": 354,
            "invoice_item_number": 8,
            "product_id": 4,
            "quantity": 47,
            "cost": 1351,
            "discount": 238,
            "self-closing": true
        },
        {
            "item_id": 1948,
            "invoice_id": 63,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 29,
            "cost": 482,
            "discount": 228,
            "self-closing": true
        },
        {
            "item_id": 1949,
            "invoice_id": 235,
            "invoice_item_number": 6,
            "product_id": 15,
            "quantity": 17,
            "cost": 1049,
            "discount": 478,
            "self-closing": true
        },
        {
            "item_id": 1950,
            "invoice_id": 141,
            "invoice_item_number": 5,
            "product_id": 12,
            "quantity": 22,
            "cost": 553,
            "discount": 671,
            "self-closing": true
        },
        {
            "item_id": 1951,
            "invoice_id": 342,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 55,
            "cost": 682,
            "discount": 957,
            "self-closing": true
        },
        {
            "item_id": 1952,
            "invoice_id": 318,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 60,
            "cost": 406,
            "discount": 183,
            "self-closing": true
        },
        {
            "item_id": 1953,
            "invoice_id": 183,
            "invoice_item_number": 3,
            "product_id": 2,
            "quantity": 67,
            "cost": 733,
            "discount": 777,
            "self-closing": true
        },
        {
            "item_id": 1954,
            "invoice_id": 245,
            "invoice_item_number": 6,
            "product_id": 5,
            "quantity": 13,
            "cost": 1034,
            "discount": 991,
            "self-closing": true
        },
        {
            "item_id": 1955,
            "invoice_id": 274,
            "invoice_item_number": 6,
            "product_id": 6,
            "quantity": 10,
            "cost": 1233,
            "discount": 69,
            "self-closing": true
        },
        {
            "item_id": 1956,
            "invoice_id": 365,
            "invoice_item_number": 7,
            "product_id": 29,
            "quantity": 61,
            "cost": 2691,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 1957,
            "invoice_id": 260,
            "invoice_item_number": 8,
            "product_id": 14,
            "quantity": 99,
            "cost": 431,
            "discount": 97,
            "self-closing": true
        },
        {
            "item_id": 1958,
            "invoice_id": 368,
            "invoice_item_number": 7,
            "product_id": 8,
            "quantity": 86,
            "cost": 405,
            "discount": 785,
            "self-closing": true
        },
        {
            "item_id": 1959,
            "invoice_id": 223,
            "invoice_item_number": 4,
            "product_id": 16,
            "quantity": 16,
            "cost": 1108,
            "discount": 229,
            "self-closing": true
        },
        {
            "item_id": 1960,
            "invoice_id": 172,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 58,
            "cost": 870,
            "discount": 418,
            "self-closing": true
        },
        {
            "item_id": 1961,
            "invoice_id": 31,
            "invoice_item_number": 8,
            "product_id": 4,
            "quantity": 63,
            "cost": 311,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1962,
            "invoice_id": 118,
            "invoice_item_number": 9,
            "product_id": 3,
            "quantity": 53,
            "cost": 861,
            "discount": 718,
            "self-closing": true
        },
        {
            "item_id": 1963,
            "invoice_id": 9,
            "invoice_item_number": 7,
            "product_id": 20,
            "quantity": 92,
            "cost": 1290,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1964,
            "invoice_id": 374,
            "invoice_item_number": 7,
            "product_id": 24,
            "quantity": 19,
            "cost": 839,
            "discount": 639,
            "self-closing": true
        },
        {
            "item_id": 1965,
            "invoice_id": 122,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 72,
            "cost": 221,
            "discount": 470,
            "self-closing": true
        },
        {
            "item_id": 1966,
            "invoice_id": 251,
            "invoice_item_number": 3,
            "product_id": 2,
            "quantity": 74,
            "cost": 860,
            "discount": 762,
            "self-closing": true
        },
        {
            "item_id": 1967,
            "invoice_id": 23,
            "invoice_item_number": 6,
            "product_id": 17,
            "quantity": 79,
            "cost": 493,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1968,
            "invoice_id": 291,
            "invoice_item_number": 2,
            "product_id": 28,
            "quantity": 97,
            "cost": 871,
            "discount": 327,
            "self-closing": true
        },
        {
            "item_id": 1969,
            "invoice_id": 135,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 58,
            "cost": 800,
            "discount": 25,
            "self-closing": true
        },
        {
            "item_id": 1970,
            "invoice_id": 301,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 60,
            "cost": 771,
            "discount": 143,
            "self-closing": true
        },
        {
            "item_id": 1971,
            "invoice_id": 255,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 88,
            "cost": 254,
            "discount": 315,
            "self-closing": true
        },
        {
            "item_id": 1972,
            "invoice_id": 174,
            "invoice_item_number": 5,
            "product_id": 15,
            "quantity": 93,
            "cost": 1152,
            "discount": 708,
            "self-closing": true
        },
        {
            "item_id": 1973,
            "invoice_id": 15,
            "invoice_item_number": 9,
            "product_id": 23,
            "quantity": 37,
            "cost": 1138,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1974,
            "invoice_id": 281,
            "invoice_item_number": 9,
            "product_id": 30,
            "quantity": 12,
            "cost": 584,
            "discount": 533,
            "self-closing": true
        },
        {
            "item_id": 1975,
            "invoice_id": 278,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 26,
            "cost": 702,
            "discount": 583,
            "self-closing": true
        },
        {
            "item_id": 1976,
            "invoice_id": 204,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 47,
            "cost": 266,
            "discount": 722,
            "self-closing": true
        },
        {
            "item_id": 1977,
            "invoice_id": 174,
            "invoice_item_number": 4,
            "product_id": 6,
            "quantity": 46,
            "cost": 1304,
            "discount": 188,
            "self-closing": true
        },
        {
            "item_id": 1978,
            "invoice_id": 308,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 58,
            "cost": 1010,
            "discount": 590,
            "self-closing": true
        },
        {
            "item_id": 1979,
            "invoice_id": 308,
            "invoice_item_number": 6,
            "product_id": 20,
            "quantity": 99,
            "cost": 1490,
            "discount": 32,
            "self-closing": true
        },
        {
            "item_id": 1980,
            "invoice_id": 283,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 19,
            "cost": 339,
            "discount": 564,
            "self-closing": true
        },
        {
            "item_id": 1981,
            "invoice_id": 126,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 96,
            "cost": 292,
            "discount": 149,
            "self-closing": true
        },
        {
            "item_id": 1982,
            "invoice_id": 291,
            "invoice_item_number": 9,
            "product_id": 10,
            "quantity": 85,
            "cost": 1178,
            "discount": 535,
            "self-closing": true
        },
        {
            "item_id": 1983,
            "invoice_id": 340,
            "invoice_item_number": 3,
            "product_id": 21,
            "quantity": 63,
            "cost": 662,
            "discount": 153,
            "self-closing": true
        },
        {
            "item_id": 1984,
            "invoice_id": 284,
            "invoice_item_number": 2,
            "product_id": 20,
            "quantity": 14,
            "cost": 263,
            "discount": 747,
            "self-closing": true
        },
        {
            "item_id": 1985,
            "invoice_id": 304,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 55,
            "cost": 369,
            "discount": 593,
            "self-closing": true
        },
        {
            "item_id": 1986,
            "invoice_id": 205,
            "invoice_item_number": 2,
            "product_id": 24,
            "quantity": 41,
            "cost": 241,
            "discount": 835,
            "self-closing": true
        },
        {
            "item_id": 1987,
            "invoice_id": 16,
            "invoice_item_number": 3,
            "product_id": 1,
            "quantity": 93,
            "cost": 1087,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1988,
            "invoice_id": 108,
            "invoice_item_number": 6,
            "product_id": 7,
            "quantity": 21,
            "cost": 437,
            "discount": 823,
            "self-closing": true
        },
        {
            "item_id": 1989,
            "invoice_id": 133,
            "invoice_item_number": 8,
            "product_id": 10,
            "quantity": 58,
            "cost": 1046,
            "discount": 527,
            "self-closing": true
        },
        {
            "item_id": 1990,
            "invoice_id": 365,
            "invoice_item_number": 8,
            "product_id": 18,
            "quantity": 2,
            "cost": 182,
            "discount": 800,
            "self-closing": true
        },
        {
            "item_id": 1991,
            "invoice_id": 372,
            "invoice_item_number": 7,
            "product_id": 17,
            "quantity": 85,
            "cost": 802,
            "discount": 233,
            "self-closing": true
        },
        {
            "item_id": 1992,
            "invoice_id": 162,
            "invoice_item_number": 9,
            "product_id": 29,
            "quantity": 28,
            "cost": 1330,
            "discount": 756,
            "self-closing": true
        },
        {
            "item_id": 1993,
            "invoice_id": 393,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 74,
            "cost": 1076,
            "discount": 801,
            "self-closing": true
        },
        {
            "item_id": 1994,
            "invoice_id": 250,
            "invoice_item_number": 6,
            "product_id": 4,
            "quantity": 80,
            "cost": 79,
            "discount": 300,
            "self-closing": true
        },
        {
            "item_id": 1995,
            "invoice_id": 279,
            "invoice_item_number": 7,
            "product_id": 13,
            "quantity": 24,
            "cost": 500,
            "discount": 628,
            "self-closing": true
        },
        {
            "item_id": 1996,
            "invoice_id": 366,
            "invoice_item_number": 7,
            "product_id": 17,
            "quantity": 70,
            "cost": 1700,
            "discount": 700,
            "self-closing": true
        },
        {
            "item_id": 1997,
            "invoice_id": 16,
            "invoice_item_number": 4,
            "product_id": 23,
            "quantity": 57,
            "cost": 803,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 1998,
            "invoice_id": 108,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 87,
            "cost": 240,
            "discount": 922,
            "self-closing": true
        },
        {
            "item_id": 1999,
            "invoice_id": 394,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 22,
            "cost": 154,
            "discount": 860,
            "self-closing": true
        },
        {
            "item_id": 2000,
            "invoice_id": 233,
            "invoice_item_number": 6,
            "product_id": 1,
            "quantity": 54,
            "cost": 1356,
            "discount": 416,
            "self-closing": true
        },
        {
            "item_id": 2001,
            "invoice_id": 368,
            "invoice_item_number": 2,
            "product_id": 10,
            "quantity": 62,
            "cost": 506,
            "discount": 633,
            "self-closing": true
        },
        {
            "item_id": 2002,
            "invoice_id": 125,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 66,
            "cost": 1425,
            "discount": 825,
            "self-closing": true
        },
        {
            "item_id": 2003,
            "invoice_id": 100,
            "invoice_item_number": 6,
            "product_id": 23,
            "quantity": 89,
            "cost": 994,
            "discount": 980,
            "self-closing": true
        },
        {
            "item_id": 2004,
            "invoice_id": 211,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 49,
            "cost": 453,
            "discount": 156,
            "self-closing": true
        },
        {
            "item_id": 2005,
            "invoice_id": 246,
            "invoice_item_number": 7,
            "product_id": 15,
            "quantity": 37,
            "cost": 537,
            "discount": 893,
            "self-closing": true
        },
        {
            "item_id": 2006,
            "invoice_id": 212,
            "invoice_item_number": 4,
            "product_id": 15,
            "quantity": 86,
            "cost": 157,
            "discount": 496,
            "self-closing": true
        },
        {
            "item_id": 2007,
            "invoice_id": 366,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 80,
            "cost": 8888,
            "discount": 111,
            "self-closing": true
        },
        {
            "item_id": 2008,
            "invoice_id": 141,
            "invoice_item_number": 8,
            "product_id": 22,
            "quantity": 87,
            "cost": 474,
            "discount": 615,
            "self-closing": true
        },
        {
            "item_id": 2009,
            "invoice_id": 70,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 99,
            "cost": 522,
            "discount": 784,
            "self-closing": true
        },
        {
            "item_id": 2010,
            "invoice_id": 146,
            "invoice_item_number": 4,
            "product_id": 4,
            "quantity": 22,
            "cost": 634,
            "discount": 677,
            "self-closing": true
        },
        {
            "item_id": 2011,
            "invoice_id": 389,
            "invoice_item_number": 4,
            "product_id": 13,
            "quantity": 52,
            "cost": 626,
            "discount": 301,
            "self-closing": true
        },
        {
            "item_id": 2012,
            "invoice_id": 284,
            "invoice_item_number": 3,
            "product_id": 30,
            "quantity": 13,
            "cost": 1379,
            "discount": 812,
            "self-closing": true
        },
        {
            "item_id": 2013,
            "invoice_id": 344,
            "invoice_item_number": 9,
            "product_id": 26,
            "quantity": 32,
            "cost": 612,
            "discount": 726,
            "self-closing": true
        },
        {
            "item_id": 2014,
            "invoice_id": 246,
            "invoice_item_number": 9,
            "product_id": 21,
            "quantity": 36,
            "cost": 666,
            "discount": 730,
            "self-closing": true
        },
        {
            "item_id": 2015,
            "invoice_id": 277,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 38,
            "cost": 257,
            "discount": 392,
            "self-closing": true
        },
        {
            "item_id": 2016,
            "invoice_id": 234,
            "invoice_item_number": 3,
            "product_id": 9,
            "quantity": 14,
            "cost": 45,
            "discount": 585,
            "self-closing": true
        },
        {
            "item_id": 2017,
            "invoice_id": 64,
            "invoice_item_number": 9,
            "product_id": 18,
            "quantity": 18,
            "cost": 764,
            "discount": 974,
            "self-closing": true
        },
        {
            "item_id": 2018,
            "invoice_id": 151,
            "invoice_item_number": 9,
            "product_id": 21,
            "quantity": 72,
            "cost": 965,
            "discount": 684,
            "self-closing": true
        },
        {
            "item_id": 2019,
            "invoice_id": 289,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 12,
            "cost": 109,
            "discount": 390,
            "self-closing": true
        },
        {
            "item_id": 2020,
            "invoice_id": 236,
            "invoice_item_number": 7,
            "product_id": 8,
            "quantity": 74,
            "cost": 204,
            "discount": 641,
            "self-closing": true
        },
        {
            "item_id": 2021,
            "invoice_id": 386,
            "invoice_item_number": 1,
            "product_id": 21,
            "quantity": 18,
            "cost": 759,
            "discount": 662,
            "self-closing": true
        },
        {
            "item_id": 2022,
            "invoice_id": 98,
            "invoice_item_number": 4,
            "product_id": 20,
            "quantity": 61,
            "cost": 1391,
            "discount": 668,
            "self-closing": true
        },
        {
            "item_id": 2023,
            "invoice_id": 13,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 85,
            "cost": 473,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2024,
            "invoice_id": 306,
            "invoice_item_number": 8,
            "product_id": 30,
            "quantity": 24,
            "cost": 512,
            "discount": 221,
            "self-closing": true
        },
        {
            "item_id": 2025,
            "invoice_id": 376,
            "invoice_item_number": 8,
            "product_id": 6,
            "quantity": 90,
            "cost": 445,
            "discount": 53,
            "self-closing": true
        },
        {
            "item_id": 2026,
            "invoice_id": 341,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 14,
            "cost": 873,
            "discount": 52,
            "self-closing": true
        },
        {
            "item_id": 2027,
            "invoice_id": 282,
            "invoice_item_number": 9,
            "product_id": 20,
            "quantity": 99,
            "cost": 911,
            "discount": 15,
            "self-closing": true
        },
        {
            "item_id": 2028,
            "invoice_id": 11,
            "invoice_item_number": 3,
            "product_id": 10,
            "quantity": 81,
            "cost": 483,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2029,
            "invoice_id": 285,
            "invoice_item_number": 3,
            "product_id": 20,
            "quantity": 81,
            "cost": 244,
            "discount": 881,
            "self-closing": true
        },
        {
            "item_id": 2030,
            "invoice_id": 317,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 58,
            "cost": 967,
            "discount": 52,
            "self-closing": true
        },
        {
            "item_id": 2031,
            "invoice_id": 214,
            "invoice_item_number": 5,
            "product_id": 2,
            "quantity": 74,
            "cost": 826,
            "discount": 68,
            "self-closing": true
        },
        {
            "item_id": 2032,
            "invoice_id": 166,
            "invoice_item_number": 3,
            "product_id": 7,
            "quantity": 62,
            "cost": 1263,
            "discount": 100,
            "self-closing": true
        },
        {
            "item_id": 2033,
            "invoice_id": 51,
            "invoice_item_number": 8,
            "product_id": 27,
            "quantity": 67,
            "cost": 875,
            "discount": 139,
            "self-closing": true
        },
        {
            "item_id": 2034,
            "invoice_id": 229,
            "invoice_item_number": 6,
            "product_id": 4,
            "quantity": 53,
            "cost": 808,
            "discount": 417,
            "self-closing": true
        },
        {
            "item_id": 2035,
            "invoice_id": 312,
            "invoice_item_number": 8,
            "product_id": 14,
            "quantity": 67,
            "cost": 1455,
            "discount": 878,
            "self-closing": true
        },
        {
            "item_id": 2036,
            "invoice_id": 49,
            "invoice_item_number": 4,
            "product_id": 19,
            "quantity": 83,
            "cost": 430,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2037,
            "invoice_id": 266,
            "invoice_item_number": 2,
            "product_id": 16,
            "quantity": 83,
            "cost": 766,
            "discount": 837,
            "self-closing": true
        },
        {
            "item_id": 2038,
            "invoice_id": 229,
            "invoice_item_number": 7,
            "product_id": 12,
            "quantity": 76,
            "cost": 1206,
            "discount": 875,
            "self-closing": true
        },
        {
            "item_id": 2039,
            "invoice_id": 284,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 100,
            "cost": 402,
            "discount": 733,
            "self-closing": true
        },
        {
            "item_id": 2040,
            "invoice_id": 188,
            "invoice_item_number": 4,
            "product_id": 16,
            "quantity": 66,
            "cost": 1408,
            "discount": 349,
            "self-closing": true
        },
        {
            "item_id": 2041,
            "invoice_id": 136,
            "invoice_item_number": 8,
            "product_id": 7,
            "quantity": 21,
            "cost": 766,
            "discount": 660,
            "self-closing": true
        },
        {
            "item_id": 2042,
            "invoice_id": 380,
            "invoice_item_number": 4,
            "product_id": 20,
            "quantity": 67,
            "cost": 511,
            "discount": 324,
            "self-closing": true
        },
        {
            "item_id": 2043,
            "invoice_id": 332,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 42,
            "cost": 1276,
            "discount": 148,
            "self-closing": true
        },
        {
            "item_id": 2044,
            "invoice_id": 315,
            "invoice_item_number": 4,
            "product_id": 20,
            "quantity": 24,
            "cost": 724,
            "discount": 663,
            "self-closing": true
        },
        {
            "item_id": 2045,
            "invoice_id": 104,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 96,
            "cost": 933,
            "discount": 185,
            "self-closing": true
        },
        {
            "item_id": 2046,
            "invoice_id": 240,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 99,
            "cost": 767,
            "discount": 454,
            "self-closing": true
        },
        {
            "item_id": 2047,
            "invoice_id": 365,
            "invoice_item_number": 6,
            "product_id": 2,
            "quantity": 161,
            "cost": 2161,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 2048,
            "invoice_id": 215,
            "invoice_item_number": 9,
            "product_id": 24,
            "quantity": 84,
            "cost": 470,
            "discount": 110,
            "self-closing": true
        },
        {
            "item_id": 2049,
            "invoice_id": 297,
            "invoice_item_number": 5,
            "product_id": 19,
            "quantity": 58,
            "cost": 817,
            "discount": 309,
            "self-closing": true
        },
        {
            "item_id": 2050,
            "invoice_id": 377,
            "invoice_item_number": 6,
            "product_id": 28,
            "quantity": 99,
            "cost": 948,
            "discount": 579,
            "self-closing": true
        },
        {
            "item_id": 2051,
            "invoice_id": 377,
            "invoice_item_number": 7,
            "product_id": 14,
            "quantity": 53,
            "cost": 814,
            "discount": 979,
            "self-closing": true
        },
        {
            "item_id": 2052,
            "invoice_id": 322,
            "invoice_item_number": 8,
            "product_id": 7,
            "quantity": 100,
            "cost": 1316,
            "discount": 583,
            "self-closing": true
        },
        {
            "item_id": 2053,
            "invoice_id": 180,
            "invoice_item_number": 5,
            "product_id": 18,
            "quantity": 96,
            "cost": 922,
            "discount": 983,
            "self-closing": true
        },
        {
            "item_id": 2054,
            "invoice_id": 86,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 82,
            "cost": 1232,
            "discount": 985,
            "self-closing": true
        },
        {
            "item_id": 2055,
            "invoice_id": 212,
            "invoice_item_number": 5,
            "product_id": 5,
            "quantity": 78,
            "cost": 727,
            "discount": 857,
            "self-closing": true
        },
        {
            "item_id": 2056,
            "invoice_id": 385,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 96,
            "cost": 1418,
            "discount": 582,
            "self-closing": true
        },
        {
            "item_id": 2057,
            "invoice_id": 330,
            "invoice_item_number": 9,
            "product_id": 5,
            "quantity": 41,
            "cost": 760,
            "discount": 129,
            "self-closing": true
        },
        {
            "item_id": 2058,
            "invoice_id": 218,
            "invoice_item_number": 8,
            "product_id": 8,
            "quantity": 52,
            "cost": 494,
            "discount": 104,
            "self-closing": true
        },
        {
            "item_id": 2059,
            "invoice_id": 188,
            "invoice_item_number": 8,
            "product_id": 20,
            "quantity": 96,
            "cost": 373,
            "discount": 828,
            "self-closing": true
        },
        {
            "item_id": 2060,
            "invoice_id": 291,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 11,
            "cost": 1044,
            "discount": 747,
            "self-closing": true
        },
        {
            "item_id": 2061,
            "invoice_id": 365,
            "invoice_item_number": 4,
            "product_id": 5,
            "quantity": 8,
            "cost": 58,
            "discount": 120,
            "self-closing": true
        },
        {
            "item_id": 2062,
            "invoice_id": 210,
            "invoice_item_number": 8,
            "product_id": 4,
            "quantity": 61,
            "cost": 358,
            "discount": 51,
            "self-closing": true
        },
        {
            "item_id": 2063,
            "invoice_id": 103,
            "invoice_item_number": 3,
            "product_id": 8,
            "quantity": 87,
            "cost": 1414,
            "discount": 856,
            "self-closing": true
        },
        {
            "item_id": 2064,
            "invoice_id": 206,
            "invoice_item_number": 2,
            "product_id": 24,
            "quantity": 43,
            "cost": 748,
            "discount": 888,
            "self-closing": true
        },
        {
            "item_id": 2065,
            "invoice_id": 289,
            "invoice_item_number": 9,
            "product_id": 1,
            "quantity": 20,
            "cost": 453,
            "discount": 830,
            "self-closing": true
        },
        {
            "item_id": 2066,
            "invoice_id": 186,
            "invoice_item_number": 9,
            "product_id": 14,
            "quantity": 34,
            "cost": 39,
            "discount": 573,
            "self-closing": true
        },
        {
            "item_id": 2067,
            "invoice_id": 194,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 20,
            "cost": 1473,
            "discount": 240,
            "self-closing": true
        },
        {
            "item_id": 2068,
            "invoice_id": 317,
            "invoice_item_number": 8,
            "product_id": 12,
            "quantity": 32,
            "cost": 177,
            "discount": 906,
            "self-closing": true
        },
        {
            "item_id": 2069,
            "invoice_id": 288,
            "invoice_item_number": 9,
            "product_id": 19,
            "quantity": 39,
            "cost": 494,
            "discount": 630,
            "self-closing": true
        },
        {
            "item_id": 2070,
            "invoice_id": 151,
            "invoice_item_number": 5,
            "product_id": 25,
            "quantity": 58,
            "cost": 568,
            "discount": 231,
            "self-closing": true
        },
        {
            "item_id": 2071,
            "invoice_id": 110,
            "invoice_item_number": 6,
            "product_id": 11,
            "quantity": 68,
            "cost": 104,
            "discount": 174,
            "self-closing": true
        },
        {
            "item_id": 2072,
            "invoice_id": 15,
            "invoice_item_number": 8,
            "product_id": 26,
            "quantity": 81,
            "cost": 133,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2073,
            "invoice_id": 322,
            "invoice_item_number": 7,
            "product_id": 27,
            "quantity": 19,
            "cost": 1304,
            "discount": 622,
            "self-closing": true
        },
        {
            "item_id": 2074,
            "invoice_id": 21,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 77,
            "cost": 38,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2075,
            "invoice_id": 180,
            "invoice_item_number": 9,
            "product_id": 7,
            "quantity": 56,
            "cost": 538,
            "discount": 870,
            "self-closing": true
        },
        {
            "item_id": 2076,
            "invoice_id": 365,
            "invoice_item_number": 2,
            "product_id": 19,
            "quantity": 9,
            "cost": 199,
            "discount": 0,
            "self-closing": true
        },
        {
            "item_id": 2077,
            "invoice_id": 377,
            "invoice_item_number": 4,
            "product_id": 18,
            "quantity": 24,
            "cost": 1374,
            "discount": 322,
            "self-closing": true
        },
        {
            "item_id": 2078,
            "invoice_id": 299,
            "invoice_item_number": 7,
            "product_id": 27,
            "quantity": 21,
            "cost": 222,
            "discount": 690,
            "self-closing": true
        },
        {
            "item_id": 2079,
            "invoice_id": 143,
            "invoice_item_number": 9,
            "product_id": 28,
            "quantity": 30,
            "cost": 629,
            "discount": 627,
            "self-closing": true
        },
        {
            "item_id": 2080,
            "invoice_id": 325,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 62,
            "cost": 806,
            "discount": 446,
            "self-closing": true
        },
        {
            "item_id": 2081,
            "invoice_id": 4,
            "invoice_item_number": 6,
            "product_id": 12,
            "quantity": 43,
            "cost": 659,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2082,
            "invoice_id": 370,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 30,
            "cost": 640,
            "discount": 977,
            "self-closing": true
        },
        {
            "item_id": 2083,
            "invoice_id": 324,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 54,
            "cost": 297,
            "discount": 549,
            "self-closing": true
        },
        {
            "item_id": 2084,
            "invoice_id": 367,
            "invoice_item_number": 1,
            "product_id": 18,
            "quantity": 15,
            "cost": 160,
            "discount": 40,
            "self-closing": true
        },
        {
            "item_id": 2085,
            "invoice_id": 348,
            "invoice_item_number": 3,
            "product_id": 23,
            "quantity": 97,
            "cost": 1481,
            "discount": 203,
            "self-closing": true
        },
        {
            "item_id": 2086,
            "invoice_id": 197,
            "invoice_item_number": 7,
            "product_id": 9,
            "quantity": 59,
            "cost": 96,
            "discount": 177,
            "self-closing": true
        },
        {
            "item_id": 2087,
            "invoice_id": 262,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 14,
            "cost": 79,
            "discount": 156,
            "self-closing": true
        },
        {
            "item_id": 2088,
            "invoice_id": 148,
            "invoice_item_number": 7,
            "product_id": 16,
            "quantity": 95,
            "cost": 131,
            "discount": 280,
            "self-closing": true
        },
        {
            "item_id": 2089,
            "invoice_id": 357,
            "invoice_item_number": 2,
            "product_id": 24,
            "quantity": 85,
            "cost": 1080,
            "discount": 70,
            "self-closing": true
        },
        {
            "item_id": 2090,
            "invoice_id": 266,
            "invoice_item_number": 9,
            "product_id": 16,
            "quantity": 15,
            "cost": 108,
            "discount": 927,
            "self-closing": true
        },
        {
            "item_id": 2091,
            "invoice_id": 254,
            "invoice_item_number": 3,
            "product_id": 16,
            "quantity": 65,
            "cost": 1219,
            "discount": 255,
            "self-closing": true
        },
        {
            "item_id": 2092,
            "invoice_id": 346,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 51,
            "cost": 1397,
            "discount": 415,
            "self-closing": true
        },
        {
            "item_id": 2093,
            "invoice_id": 58,
            "invoice_item_number": 9,
            "product_id": 15,
            "quantity": 51,
            "cost": 1162,
            "discount": 291,
            "self-closing": true
        },
        {
            "item_id": 2094,
            "invoice_id": 291,
            "invoice_item_number": 4,
            "product_id": 21,
            "quantity": 69,
            "cost": 490,
            "discount": 895,
            "self-closing": true
        },
        {
            "item_id": 2095,
            "invoice_id": 367,
            "invoice_item_number": 7,
            "product_id": 11,
            "quantity": 20,
            "cost": 2000,
            "discount": 460,
            "self-closing": true
        },
        {
            "item_id": 2096,
            "invoice_id": 350,
            "invoice_item_number": 2,
            "product_id": 2,
            "quantity": 51,
            "cost": 566,
            "discount": 499,
            "self-closing": true
        },
        {
            "item_id": 2097,
            "invoice_id": 142,
            "invoice_item_number": 2,
            "product_id": 25,
            "quantity": 94,
            "cost": 578,
            "discount": 969,
            "self-closing": true
        },
        {
            "item_id": 2098,
            "invoice_id": 168,
            "invoice_item_number": 5,
            "product_id": 23,
            "quantity": 24,
            "cost": 919,
            "discount": 681,
            "self-closing": true
        },
        {
            "item_id": 2099,
            "invoice_id": 312,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 87,
            "cost": 1355,
            "discount": 864,
            "self-closing": true
        },
        {
            "item_id": 2100,
            "invoice_id": 367,
            "invoice_item_number": 8,
            "product_id": 25,
            "quantity": 80,
            "cost": 8000,
            "discount": 88,
            "self-closing": true
        },
        {
            "item_id": 2101,
            "invoice_id": 325,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 67,
            "cost": 383,
            "discount": 120,
            "self-closing": true
        },
        {
            "item_id": 2102,
            "invoice_id": 379,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 71,
            "cost": 1272,
            "discount": 992,
            "self-closing": true
        },
        {
            "item_id": 2103,
            "invoice_id": 162,
            "invoice_item_number": 7,
            "product_id": 1,
            "quantity": 59,
            "cost": 669,
            "discount": 694,
            "self-closing": true
        },
        {
            "item_id": 2104,
            "invoice_id": 136,
            "invoice_item_number": 2,
            "product_id": 23,
            "quantity": 76,
            "cost": 630,
            "discount": 64,
            "self-closing": true
        },
        {
            "item_id": 2105,
            "invoice_id": 132,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 63,
            "cost": 838,
            "discount": 285,
            "self-closing": true
        },
        {
            "item_id": 2106,
            "invoice_id": 299,
            "invoice_item_number": 8,
            "product_id": 28,
            "quantity": 41,
            "cost": 1295,
            "discount": 988,
            "self-closing": true
        },
        {
            "item_id": 2107,
            "invoice_id": 367,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 30,
            "cost": 340,
            "discount": 3,
            "self-closing": true
        },
        {
            "item_id": 2108,
            "invoice_id": 277,
            "invoice_item_number": 9,
            "product_id": 19,
            "quantity": 64,
            "cost": 1343,
            "discount": 651,
            "self-closing": true
        },
        {
            "item_id": 2109,
            "invoice_id": 350,
            "invoice_item_number": 8,
            "product_id": 4,
            "quantity": 72,
            "cost": 380,
            "discount": 959,
            "self-closing": true
        },
        {
            "item_id": 2110,
            "invoice_id": 255,
            "invoice_item_number": 4,
            "product_id": 22,
            "quantity": 42,
            "cost": 581,
            "discount": 851,
            "self-closing": true
        },
        {
            "item_id": 2111,
            "invoice_id": 145,
            "invoice_item_number": 2,
            "product_id": 17,
            "quantity": 67,
            "cost": 880,
            "discount": 740,
            "self-closing": true
        },
        {
            "item_id": 2112,
            "invoice_id": 175,
            "invoice_item_number": 9,
            "product_id": 1,
            "quantity": 22,
            "cost": 871,
            "discount": 739,
            "self-closing": true
        },
        {
            "item_id": 2113,
            "invoice_id": 206,
            "invoice_item_number": 2,
            "product_id": 20,
            "quantity": 88,
            "cost": 1012,
            "discount": 111,
            "self-closing": true
        },
        {
            "item_id": 2114,
            "invoice_id": 312,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 33,
            "cost": 892,
            "discount": 783,
            "self-closing": true
        },
        {
            "item_id": 2115,
            "invoice_id": 140,
            "invoice_item_number": 9,
            "product_id": 27,
            "quantity": 82,
            "cost": 845,
            "discount": 982,
            "self-closing": true
        },
        {
            "item_id": 2116,
            "invoice_id": 176,
            "invoice_item_number": 8,
            "product_id": 21,
            "quantity": 10,
            "cost": 683,
            "discount": 994,
            "self-closing": true
        },
        {
            "item_id": 2117,
            "invoice_id": 197,
            "invoice_item_number": 8,
            "product_id": 22,
            "quantity": 68,
            "cost": 864,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2118,
            "invoice_id": 147,
            "invoice_item_number": 9,
            "product_id": 28,
            "quantity": 39,
            "cost": 115,
            "discount": 430,
            "self-closing": true
        },
        {
            "item_id": 2119,
            "invoice_id": 338,
            "invoice_item_number": 6,
            "product_id": 23,
            "quantity": 45,
            "cost": 1221,
            "discount": 523,
            "self-closing": true
        },
        {
            "item_id": 2120,
            "invoice_id": 163,
            "invoice_item_number": 2,
            "product_id": 19,
            "quantity": 78,
            "cost": 33,
            "discount": 706,
            "self-closing": true
        },
        {
            "item_id": 2121,
            "invoice_id": 132,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 59,
            "cost": 1396,
            "discount": 20,
            "self-closing": true
        },
        {
            "item_id": 2122,
            "invoice_id": 221,
            "invoice_item_number": 3,
            "product_id": 11,
            "quantity": 13,
            "cost": 1056,
            "discount": 80,
            "self-closing": true
        },
        {
            "item_id": 2123,
            "invoice_id": 4,
            "invoice_item_number": 8,
            "product_id": 7,
            "quantity": 43,
            "cost": 240,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2124,
            "invoice_id": 208,
            "invoice_item_number": 7,
            "product_id": 9,
            "quantity": 48,
            "cost": 1237,
            "discount": 738,
            "self-closing": true
        },
        {
            "item_id": 2125,
            "invoice_id": 367,
            "invoice_item_number": 3,
            "product_id": 29,
            "quantity": 50,
            "cost": 550,
            "discount": 50,
            "self-closing": true
        },
        {
            "item_id": 2126,
            "invoice_id": 181,
            "invoice_item_number": 3,
            "product_id": 28,
            "quantity": 37,
            "cost": 163,
            "discount": 497,
            "self-closing": true
        },
        {
            "item_id": 2127,
            "invoice_id": 299,
            "invoice_item_number": 9,
            "product_id": 25,
            "quantity": 61,
            "cost": 1464,
            "discount": 760,
            "self-closing": true
        },
        {
            "item_id": 2128,
            "invoice_id": 267,
            "invoice_item_number": 6,
            "product_id": 25,
            "quantity": 64,
            "cost": 225,
            "discount": 256,
            "self-closing": true
        },
        {
            "item_id": 2129,
            "invoice_id": 359,
            "invoice_item_number": 8,
            "product_id": 14,
            "quantity": 10,
            "cost": 1030,
            "discount": 57,
            "self-closing": true
        },
        {
            "item_id": 2130,
            "invoice_id": 17,
            "invoice_item_number": 5,
            "product_id": 1,
            "quantity": 62,
            "cost": 825,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2131,
            "invoice_id": 144,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 32,
            "cost": 884,
            "discount": 531,
            "self-closing": true
        },
        {
            "item_id": 2132,
            "invoice_id": 275,
            "invoice_item_number": 2,
            "product_id": 27,
            "quantity": 61,
            "cost": 1057,
            "discount": 747,
            "self-closing": true
        },
        {
            "item_id": 2133,
            "invoice_id": 210,
            "invoice_item_number": 6,
            "product_id": 26,
            "quantity": 66,
            "cost": 1076,
            "discount": 898,
            "self-closing": true
        },
        {
            "item_id": 2134,
            "invoice_id": 221,
            "invoice_item_number": 2,
            "product_id": 7,
            "quantity": 62,
            "cost": 85,
            "discount": 972,
            "self-closing": true
        },
        {
            "item_id": 2135,
            "invoice_id": 263,
            "invoice_item_number": 5,
            "product_id": 28,
            "quantity": 87,
            "cost": 552,
            "discount": 999,
            "self-closing": true
        },
        {
            "item_id": 2136,
            "invoice_id": 204,
            "invoice_item_number": 6,
            "product_id": 24,
            "quantity": 22,
            "cost": 805,
            "discount": 827,
            "self-closing": true
        },
        {
            "item_id": 2137,
            "invoice_id": 34,
            "invoice_item_number": 2,
            "product_id": 13,
            "quantity": 79,
            "cost": 65,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2138,
            "invoice_id": 353,
            "invoice_item_number": 7,
            "product_id": 16,
            "quantity": 52,
            "cost": 213,
            "discount": 333,
            "self-closing": true
        },
        {
            "item_id": 2139,
            "invoice_id": 383,
            "invoice_item_number": 3,
            "product_id": 18,
            "quantity": 100,
            "cost": 620,
            "discount": 209,
            "self-closing": true
        },
        {
            "item_id": 2140,
            "invoice_id": 101,
            "invoice_item_number": 5,
            "product_id": 30,
            "quantity": 51,
            "cost": 42,
            "discount": 43,
            "self-closing": true
        },
        {
            "item_id": 2141,
            "invoice_id": 29,
            "invoice_item_number": 9,
            "product_id": 17,
            "quantity": 83,
            "cost": 444,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2142,
            "invoice_id": 98,
            "invoice_item_number": 2,
            "product_id": 22,
            "quantity": 58,
            "cost": 1488,
            "discount": 588,
            "self-closing": true
        },
        {
            "item_id": 2143,
            "invoice_id": 52,
            "invoice_item_number": 6,
            "product_id": 27,
            "quantity": 68,
            "cost": 194,
            "discount": 328,
            "self-closing": true
        },
        {
            "item_id": 2144,
            "invoice_id": 170,
            "invoice_item_number": 5,
            "product_id": 29,
            "quantity": 56,
            "cost": 668,
            "discount": 664,
            "self-closing": true
        },
        {
            "item_id": 2145,
            "invoice_id": 114,
            "invoice_item_number": 9,
            "product_id": 23,
            "quantity": 13,
            "cost": 1172,
            "discount": 194,
            "self-closing": true
        },
        {
            "item_id": 2146,
            "invoice_id": 317,
            "invoice_item_number": 5,
            "product_id": 19,
            "quantity": 40,
            "cost": 266,
            "discount": 508,
            "self-closing": true
        },
        {
            "item_id": 2147,
            "invoice_id": 349,
            "invoice_item_number": 7,
            "product_id": 25,
            "quantity": 17,
            "cost": 771,
            "discount": 453,
            "self-closing": true
        },
        {
            "item_id": 2148,
            "invoice_id": 227,
            "invoice_item_number": 8,
            "product_id": 23,
            "quantity": 43,
            "cost": 987,
            "discount": 81,
            "self-closing": true
        },
        {
            "item_id": 2149,
            "invoice_id": 68,
            "invoice_item_number": 8,
            "product_id": 8,
            "quantity": 61,
            "cost": 543,
            "discount": 977,
            "self-closing": true
        },
        {
            "item_id": 2150,
            "invoice_id": 173,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 89,
            "cost": 248,
            "discount": 762,
            "self-closing": true
        },
        {
            "item_id": 2151,
            "invoice_id": 273,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 39,
            "cost": 858,
            "discount": 870,
            "self-closing": true
        },
        {
            "item_id": 2152,
            "invoice_id": 354,
            "invoice_item_number": 9,
            "product_id": 20,
            "quantity": 15,
            "cost": 656,
            "discount": 667,
            "self-closing": true
        },
        {
            "item_id": 2153,
            "invoice_id": 264,
            "invoice_item_number": 3,
            "product_id": 7,
            "quantity": 48,
            "cost": 1080,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2154,
            "invoice_id": 250,
            "invoice_item_number": 3,
            "product_id": 22,
            "quantity": 52,
            "cost": 1391,
            "discount": 37,
            "self-closing": true
        },
        {
            "item_id": 2155,
            "invoice_id": 57,
            "invoice_item_number": 9,
            "product_id": 28,
            "quantity": 61,
            "cost": 591,
            "discount": 317,
            "self-closing": true
        },
        {
            "item_id": 2156,
            "invoice_id": 203,
            "invoice_item_number": 2,
            "product_id": 15,
            "quantity": 51,
            "cost": 1387,
            "discount": 20,
            "self-closing": true
        },
        {
            "item_id": 2157,
            "invoice_id": 244,
            "invoice_item_number": 3,
            "product_id": 24,
            "quantity": 14,
            "cost": 258,
            "discount": 712,
            "self-closing": true
        },
        {
            "item_id": 2158,
            "invoice_id": 93,
            "invoice_item_number": 2,
            "product_id": 11,
            "quantity": 72,
            "cost": 611,
            "discount": 924,
            "self-closing": true
        },
        {
            "item_id": 2159,
            "invoice_id": 115,
            "invoice_item_number": 8,
            "product_id": 19,
            "quantity": 15,
            "cost": 1483,
            "discount": 414,
            "self-closing": true
        },
        {
            "item_id": 2160,
            "invoice_id": 55,
            "invoice_item_number": 4,
            "product_id": 18,
            "quantity": 78,
            "cost": 308,
            "discount": 580,
            "self-closing": true
        },
        {
            "item_id": 2161,
            "invoice_id": 334,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 77,
            "cost": 753,
            "discount": 440,
            "self-closing": true
        },
        {
            "item_id": 2162,
            "invoice_id": 358,
            "invoice_item_number": 7,
            "product_id": 12,
            "quantity": 71,
            "cost": 436,
            "discount": 575,
            "self-closing": true
        },
        {
            "item_id": 2163,
            "invoice_id": 173,
            "invoice_item_number": 6,
            "product_id": 21,
            "quantity": 67,
            "cost": 852,
            "discount": 890,
            "self-closing": true
        },
        {
            "item_id": 2164,
            "invoice_id": 194,
            "invoice_item_number": 9,
            "product_id": 12,
            "quantity": 99,
            "cost": 254,
            "discount": 875,
            "self-closing": true
        },
        {
            "item_id": 2165,
            "invoice_id": 314,
            "invoice_item_number": 2,
            "product_id": 9,
            "quantity": 24,
            "cost": 439,
            "discount": 270,
            "self-closing": true
        },
        {
            "item_id": 2166,
            "invoice_id": 62,
            "invoice_item_number": 4,
            "product_id": 27,
            "quantity": 63,
            "cost": 895,
            "discount": 352,
            "self-closing": true
        },
        {
            "item_id": 2167,
            "invoice_id": 367,
            "invoice_item_number": 4,
            "product_id": 21,
            "quantity": 14,
            "cost": 150,
            "discount": 60,
            "self-closing": true
        },
        {
            "item_id": 2168,
            "invoice_id": 308,
            "invoice_item_number": 7,
            "product_id": 27,
            "quantity": 15,
            "cost": 1327,
            "discount": 178,
            "self-closing": true
        },
        {
            "item_id": 2169,
            "invoice_id": 359,
            "invoice_item_number": 2,
            "product_id": 29,
            "quantity": 13,
            "cost": 503,
            "discount": 527,
            "self-closing": true
        },
        {
            "item_id": 2170,
            "invoice_id": 4,
            "invoice_item_number": 9,
            "product_id": 30,
            "quantity": 57,
            "cost": 218,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2171,
            "invoice_id": 95,
            "invoice_item_number": 9,
            "product_id": 9,
            "quantity": 60,
            "cost": 1343,
            "discount": 542,
            "self-closing": true
        },
        {
            "item_id": 2172,
            "invoice_id": 234,
            "invoice_item_number": 5,
            "product_id": 3,
            "quantity": 93,
            "cost": 66,
            "discount": 738,
            "self-closing": true
        },
        {
            "item_id": 2173,
            "invoice_id": 371,
            "invoice_item_number": 9,
            "product_id": 18,
            "quantity": 52,
            "cost": 1296,
            "discount": 78,
            "self-closing": true
        },
        {
            "item_id": 2174,
            "invoice_id": 105,
            "invoice_item_number": 8,
            "product_id": 9,
            "quantity": 71,
            "cost": 636,
            "discount": 541,
            "self-closing": true
        },
        {
            "item_id": 2175,
            "invoice_id": 367,
            "invoice_item_number": 5,
            "product_id": 8,
            "quantity": 190,
            "cost": 20000,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2176,
            "invoice_id": 230,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 94,
            "cost": 1495,
            "discount": 628,
            "self-closing": true
        },
        {
            "item_id": 2177,
            "invoice_id": 5,
            "invoice_item_number": 4,
            "product_id": 8,
            "quantity": 74,
            "cost": 1048,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2178,
            "invoice_id": 10,
            "invoice_item_number": 4,
            "product_id": 30,
            "quantity": 32,
            "cost": 335,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2179,
            "invoice_id": 87,
            "invoice_item_number": 3,
            "product_id": 4,
            "quantity": 84,
            "cost": 538,
            "discount": 214,
            "self-closing": true
        },
        {
            "item_id": 2180,
            "invoice_id": 27,
            "invoice_item_number": 7,
            "product_id": 27,
            "quantity": 11,
            "cost": 1198,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2181,
            "invoice_id": 92,
            "invoice_item_number": 5,
            "product_id": 17,
            "quantity": 19,
            "cost": 1373,
            "discount": 131,
            "self-closing": true
        },
        {
            "item_id": 2182,
            "invoice_id": 149,
            "invoice_item_number": 6,
            "product_id": 19,
            "quantity": 57,
            "cost": 831,
            "discount": 45,
            "self-closing": true
        },
        {
            "item_id": 2183,
            "invoice_id": 199,
            "invoice_item_number": 3,
            "product_id": 17,
            "quantity": 80,
            "cost": 1286,
            "discount": 178,
            "self-closing": true
        },
        {
            "item_id": 2184,
            "invoice_id": 110,
            "invoice_item_number": 4,
            "product_id": 24,
            "quantity": 68,
            "cost": 517,
            "discount": 427,
            "self-closing": true
        },
        {
            "item_id": 2185,
            "invoice_id": 144,
            "invoice_item_number": 7,
            "product_id": 10,
            "quantity": 48,
            "cost": 1316,
            "discount": 911,
            "self-closing": true
        },
        {
            "item_id": 2186,
            "invoice_id": 138,
            "invoice_item_number": 3,
            "product_id": 28,
            "quantity": 23,
            "cost": 286,
            "discount": 201,
            "self-closing": true
        },
        {
            "item_id": 2187,
            "invoice_id": 148,
            "invoice_item_number": 8,
            "product_id": 29,
            "quantity": 81,
            "cost": 552,
            "discount": 199,
            "self-closing": true
        },
        {
            "item_id": 2188,
            "invoice_id": 391,
            "invoice_item_number": 6,
            "product_id": 10,
            "quantity": 19,
            "cost": 326,
            "discount": 353,
            "self-closing": true
        },
        {
            "item_id": 2189,
            "invoice_id": 73,
            "invoice_item_number": 3,
            "product_id": 23,
            "quantity": 94,
            "cost": 38,
            "discount": 781,
            "self-closing": true
        },
        {
            "item_id": 2190,
            "invoice_id": 371,
            "invoice_item_number": 9,
            "product_id": 8,
            "quantity": 93,
            "cost": 1197,
            "discount": 36,
            "self-closing": true
        },
        {
            "item_id": 2191,
            "invoice_id": 36,
            "invoice_item_number": 7,
            "product_id": 18,
            "quantity": 41,
            "cost": 963,
            "discount": 500,
            "self-closing": true
        },
        {
            "item_id": 2192,
            "invoice_id": 167,
            "invoice_item_number": 5,
            "product_id": 6,
            "quantity": 89,
            "cost": 1077,
            "discount": 206,
            "self-closing": true
        },
        {
            "item_id": 2193,
            "invoice_id": 367,
            "invoice_item_number": 6,
            "product_id": 3,
            "quantity": 5,
            "cost": 67,
            "discount": 80,
            "self-closing": true
        },
        {
            "item_id": 2194,
            "invoice_id": 121,
            "invoice_item_number": 6,
            "product_id": 28,
            "quantity": 65,
            "cost": 826,
            "discount": 156,
            "self-closing": true
        },
        {
            "item_id": 2195,
            "invoice_id": 226,
            "invoice_item_number": 5,
            "product_id": 7,
            "quantity": 66,
            "cost": 291,
            "discount": 49,
            "self-closing": true
        },
        {
            "item_id": 2196,
            "invoice_id": 93,
            "invoice_item_number": 2,
            "product_id": 17,
            "quantity": 88,
            "cost": 485,
            "discount": 587,
            "self-closing": true
        },
        {
            "item_id": 2197,
            "invoice_id": 219,
            "invoice_item_number": 9,
            "product_id": 1,
            "quantity": 40,
            "cost": 1105,
            "discount": 806,
            "self-closing": true
        },
        {
            "item_id": 2198,
            "invoice_id": 308,
            "invoice_item_number": 9,
            "product_id": 13,
            "quantity": 90,
            "cost": 1028,
            "discount": 557,
            "self-closing": true
        },
        {
            "item_id": 2199,
            "invoice_id": 356,
            "invoice_item_number": 4,
            "product_id": 6,
            "quantity": 89,
            "cost": 479,
            "discount": 913,
            "self-closing": true
        },
        {
            "item_id": 2200,
            "invoice_id": 138,
            "invoice_item_number": 7,
            "product_id": 28,
            "quantity": 81,
            "cost": 1068,
            "discount": 355,
            "self-closing": true
        }
    ]

    const sampleCustomer =[
        {
            "customer_id": 1,
            "company_name": "Daniel",
            "contact_first_name": "Daniel",
            "contact_last_name": "Boulud",
            "phone_number": "+1 212-288-0033",
            "address_line_1": "60 E 65th St",
            "email": "business@danielnyc.com",
            "city": "New York",
            "state": "NY",
            "zip": "10065",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 2,
            "company_name": "Per Se",
            "contact_first_name": "Thomas",
            "contact_last_name": "Keller",
            "phone_number": "+1 212-823-9335",
            "address_line_1": "10 Columbus Circle",
            "email": "chef@perseny.com",
            "city": "New York",
            "state": "NY",
            "zip": "10019",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 3,
            "company_name": "Bouley",
            "contact_first_name": "David",
            "contact_last_name": "Bouley",
            "phone_number": "+1 212-964-2525",
            "address_line_1": "163 Duane St",
            "email": "david@davidbouley.com",
            "city": "New York",
            "state": "NY",
            "zip": "10013",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 4,
            "company_name": "Providence",
            "contact_first_name": "Michael",
            "contact_last_name": "Cimarusti",
            "phone_number": "+1 323-460-4170",
            "address_line_1": "5955 Melrose Ave",
            "email": "cima@providencela.com",
            "city": "Los Angeles",
            "state": "CA",
            "zip": "90038",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 5,
            "company_name": "Water Grill",
            "contact_first_name": "Paolo",
            "contact_last_name": "Bendezu",
            "phone_number": "+1 213-891-0900",
            "address_line_1": "544 S. Grand Avenue",
            "email": "downtown@watergrill.com",
            "city": "Los Angeles",
            "state": "CA",
            "zip": "90071",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 6,
            "company_name": "Alinea",
            "contact_first_name": "Grant",
            "contact_last_name": "Achatz",
            "phone_number": "+1 312-867-0110",
            "address_line_1": "1723 N Halsted St",
            "email": "kitchen@alinearestaurant.com",
            "city": "Chicago",
            "state": "IL",
            "zip": "60614",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 7,
            "company_name": "Chama Gaucha Brazilian Steakhouse",
            "contact_first_name": "Joso Carlos",
            "contact_last_name": "Ongaratto",
            "phone_number": "+1 630-324-6002",
            "address_line_1": "3008 Finley Rd, Downers Grove",
            "email": "joao@chamagaucha.com",
            "city": "Houston",
            "state": "TX",
            "zip": "60515",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 8,
            "company_name": "Zahav",
            "contact_first_name": "Michael",
            "contact_last_name": "Solomonov",
            "phone_number": "+1 215-625-8800",
            "address_line_1": "237 St. James Place",
            "email": "chef@zahavrestaurant.com",
            "city": "Philadelphia",
            "state": "PA",
            "zip": "19106",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 9,
            "company_name": "Steak 44",
            "contact_first_name": "Robert",
            "contact_last_name": "Watson",
            "phone_number": "+1 602-271-4400",
            "address_line_1": "5101 N 44th St",
            "email": "rob@steak44.com",
            "city": "Phoenix",
            "state": "AZ",
            "zip": "85018",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 10,
            "company_name": "Bliss",
            "contact_first_name": "Mark",
            "contact_last_name": "Bliss",
            "phone_number": "+1 210-225-2547",
            "address_line_1": "926 S Presa St",
            "email": "mark@foodisbliss.com",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78210",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 11,
            "company_name": "Distrito",
            "contact_first_name": "David",
            "contact_last_name": "Ramirez",
            "phone_number": "+1 215-222-1657",
            "address_line_1": "3945 Chestnut St",
            "email": "david@distrito.com",
            "city": "Philadelphia",
            "state": "PA",
            "zip": "19104",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 12,
            "company_name": "Pappas Bros. Steakhouse",
            "contact_first_name": "Jim",
            "contact_last_name": "Beam",
            "phone_number": "+1 214-366-2000",
            "address_line_1": "10477 Lombardy Ln",
            "email": "jim@pappasbros.com",
            "city": "Dallas",
            "state": "TX",
            "zip": "75220",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 13,
            "company_name": "La Foret Restaurant",
            "contact_first_name": "Andres",
            "contact_last_name": "Castillera",
            "phone_number": "+1 408-997-3458",
            "address_line_1": "21747 Bertram Rd",
            "email": "andres@laforetrestaurant.com",
            "city": "San Jose",
            "state": "CA",
            "zip": "95120",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 14,
            "company_name": "Five Sixty",
            "contact_first_name": "Wolfgang",
            "contact_last_name": "Puck",
            "phone_number": "+1 214-571-5784",
            "address_line_1": "300 Reunion Blvd.",
            "email": "wolffsrevier@wolfgangpuck.com",
            "city": "Dallas",
            "state": "TX",
            "zip": "75207",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 15,
            "company_name": "The Capital Grille",
            "contact_first_name": "Jim",
            "contact_last_name": "Nuetzi",
            "phone_number": "+1 305-374-4500",
            "address_line_1": "444 Brickell Ave",
            "email": "jimthechef@thecapitalgrille.com",
            "city": "Miami",
            "state": "FL",
            "zip": "33131",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 16,
            "company_name": "Truluck's Restaurant",
            "contact_first_name": "Michael",
            "contact_last_name": "Cerny",
            "phone_number": "+1 305-579-0035",
            "address_line_1": "777 Brickell Ave",
            "email": "test.qa@sapho.com",
            "city": "Miami",
            "state": "FL",
            "zip": "33131",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 17,
            "company_name": "Kokkari Estiatorio",
            "contact_first_name": "Erik",
            "contact_last_name": "Cosselmon",
            "phone_number": "+1 415-981-0983",
            "address_line_1": "200 Jackson Street",
            "email": "all@kokkari.com",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94111",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 18,
            "company_name": "Seven Hills",
            "contact_first_name": "Anthony",
            "contact_last_name": "Florian",
            "phone_number": "+1 415-775-1550",
            "address_line_1": "1550 Hyde St",
            "email": "food@sevenhillssf.com",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94109",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 19,
            "company_name": "Restaurant Gary Danko",
            "contact_first_name": "Gary",
            "contact_last_name": "Danko",
            "phone_number": "+1 415-749-2060",
            "address_line_1": "800 North Point Street",
            "email": "chef@garydanko.com",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94109",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 20,
            "company_name": "Boulevard",
            "contact_first_name": "Nancy",
            "contact_last_name": "Oakes",
            "phone_number": "+1 415-543-6084",
            "address_line_1": "1 Mission Street",
            "email": "purchase@boulevardrestaurant.com",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94105",
            "country": "USA",
            "self-closing": true
        },
        {
            "customer_id": 21,
            "company_name": "Cafe Pushkin (empty_string Contacts)",
            "contact_first_name": "",
            "contact_last_name": "",
            "phone_number": "+7 495 739-00-33",
            "address_line_1": "Tverskoi Blvd. 26A",
            "email": "makhov@cafe-pushkin.ru",
            "city": "Moscow",
            "postalcode": "125009",
            "country": "Russia",
            "self-closing": true
        },
        {
            "customer_id": 22,
            "company_name": "Savva",
            "contact_first_name": "Andrey",
            "contact_last_name": "Shmakov",
            "phone_number": "+7 499-270-10-62",
            "address_line_1": "Teatralnyy pr-d, 2",
            "email": "andrey@savvarest.ru",
            "city": "Moscow",
            "postalcode": "109012",
            "country": "Russia",
            "self-closing": true
        },
        {
            "customer_id": 23,
            "company_name": "The Five Fields",
            "contact_first_name": "Taylor",
            "contact_last_name": "Bonnyman",
            "phone_number": "+44 20 7838 1082",
            "address_line_1": "8-9 Blacklands Terrace, Chelsea",
            "email": "patron@fivefieldsrestaurant.com",
            "city": "London",
            "postalcode": "SW3 2SP",
            "country": "Great Britain",
            "self-closing": true
        },
        {
            "customer_id": 24,
            "company_name": "Gastronhome",
            "contact_first_name": "Damien",
            "contact_last_name": "Fremont",
            "phone_number": "+44 20 3417 5639",
            "address_line_1": "59 Lavender Hill, Battersea",
            "email": "chef@gastronhome.co.uk",
            "city": "London",
            "postalcode": "SW11 5QN",
            "country": "Great Britain",
            "self-closing": true
        },
        {
            "customer_id": 25,
            "company_name": "Union Street Cafe",
            "contact_first_name": "Gordon",
            "contact_last_name": "Ramsey",
            "phone_number": "+44 20 7592 7977",
            "address_line_1": "47-51 Great Suffolk Street",
            "email": "usc@gordonramseyrestaurants.com",
            "city": "London",
            "postalcode": "SE1 0BS",
            "country": "Great Britain",
            "self-closing": true
        },
        {
            "customer_id": 26,
            "company_name": "Restaurant Bieberbau",
            "contact_first_name": "Stephan",
            "contact_last_name": "Garkisch",
            "phone_number": "+49 30 853 23 90",
            "address_line_1": "Durlacher Straße 15",
            "email": "kuche@bieberbau-berlin.de",
            "city": "Berlin",
            "postalcode": "10715",
            "country": "Germany",
            "self-closing": true
        },
        {
            "customer_id": 27,
            "company_name": "FACIL",
            "contact_first_name": "Michael",
            "contact_last_name": "Kempf",
            "phone_number": "+49 30 590051234",
            "address_line_1": "Potsdamer Straße 3",
            "email": "michael@facil.de",
            "city": "Berlin",
            "postalcode": "10785",
            "country": "Germany",
            "self-closing": true
        },
        {
            "customer_id": 28,
            "company_name": "Restaurant Alcron",
            "contact_first_name": "Roman",
            "contact_last_name": "Paulus",
            "phone_number": "+410 222 820 000",
            "address_line_1": "Stepanska 623/40",
            "email": "chef.alcron@radissonblu.com",
            "city": "Prague",
            "postalcode": "11000",
            "country": "Czech Republic",
            "self-closing": true
        },
        {
            "customer_id": 29,
            "company_name": "Spoonik",
            "contact_first_name": "Jon",
            "contact_last_name": "Giraldo",
            "phone_number": "+34 648 08 52 09",
            "address_line_1": "Plaza Lesseps S/N",
            "email": "chef@spoonik.com",
            "city": "Barcelona",
            "postalcode": "08023",
            "country": "Spain",
            "self-closing": true
        },
        {
            "customer_id": 30,
            "company_name": "Pipero al Rex",
            "contact_first_name": "Signor",
            "contact_last_name": "Valentino",
            "phone_number": "+39 064824828",
            "address_line_1": "Via Torino 149",
            "email": "rex@hotelrex.com",
            "city": "Rome",
            "postalcode": "00184",
            "country": "Italy",
            "self-closing": true
        },
        {
            "customer_id": 31,
            "company_name": "Boutary",
            "contact_first_name": "Jay Wok",
            "contact_last_name": "Hur",
            "phone_number": "+33 143436910",
            "address_line_1": "25 Rue Mazarine",
            "email": "TEST.QA@SAPHO.COM",
            "city": "Paris",
            "postalcode": "75006",
            "country": "France",
            "self-closing": true
        },
        {
            "customer_id": 32,
            "company_name": "Epicure",
            "contact_first_name": "Eric",
            "contact_last_name": "Frechon",
            "phone_number": "+33 153434340",
            "address_line_1": "112 rue du Faubourg Saint-Honoré",
            "email": "eric@epicure.fr",
            "city": "Paris",
            "country": "France",
            "self-closing": true
        },
        {
            "customer_id": 33,
            "company_name": "Loca",
            "contact_first_name": "Nicolas",
            "contact_last_name": "Gradl",
            "phone_number": "+43 1 5121172",
            "address_line_1": "Stubenbastei 10",
            "email": "chef@bettereatbetter.com",
            "city": "Vienna",
            "postalcode": "1010",
            "country": "Austria",
            "self-closing": true
        },
        {
            "customer_id": 34,
            "company_name": "Uma",
            "contact_first_name": "Emmanuel",
            "contact_last_name": "Noboa",
            "phone_number": "+34 656 99 09 30",
            "address_line_1": "Carrer de Provenca, 310",
            "email": "em@espaciouma.com",
            "city": "Barcelona",
            "postalcode": "08037",
            "country": "Spain",
            "self-closing": true
        },
        {
            "customer_id": 35,
            "company_name": "Le Rabassier",
            "contact_first_name": "Christophe",
            "contact_last_name": "Durieux",
            "phone_number": "+32 2 502 04 00",
            "address_line_1": "Rue de Rollebeek 23",
            "email": "lechef@lerabassier.be",
            "city": "Brussels",
            "postalcode": "1000",
            "country": "Belgium",
            "self-closing": true
        },
        {
            "customer_id": 36,
            "company_name": "est.",
            "contact_first_name": "Peter",
            "contact_last_name": "Doyle",
            "phone_number": "+61 2 9240 3000",
            "address_line_1": "Level 1, Establishment&#xA;252 George Street",
            "email": "chef@merivale.com",
            "city": "Sydney",
            "postalcode": "2000",
            "country": "Australia",
            "self-closing": true
        },
        {
            "customer_id": 37,
            "company_name": "Absinthe",
            "contact_first_name": "Patrick",
            "contact_last_name": "Garland",
            "phone_number": "+1 613-761-1138",
            "address_line_1": "1208 Wellington Street West",
            "email": "TeSt.Qa@SaPhO.CoM",
            "city": "Ottawa",
            "postalcode": "ON K1Y 2Z7",
            "country": "Canada",
            "self-closing": true
        },
        {
            "customer_id": 38,
            "company_name": "Metamorfosi Restaurant",
            "contact_first_name": "Roy",
            "contact_last_name": "Salomon Caceres",
            "phone_number": "+39 06 807 6839",
            "address_line_1": "Via Giovanni Antonelli 30/32",
            "email": "roythechecf@metamorfosi.it",
            "city": "Rome",
            "postalcode": "00197",
            "country": "Italy",
            "self-closing": true
        },
        {
            "customer_id": 39,
            "company_name": "Varanda Grill",
            "contact_first_name": "Sylvio",
            "contact_last_name": "Lazzarini",
            "phone_number": "+55 11 3887-8870",
            "address_line_1": "R. Gen. Mena Barreto, 793",
            "email": "Test.qa@sapho.com",
            "city": "Sao Paulo",
            "postalcode": "01433-010",
            "country": "Brazil",
            "self-closing": true
        },
        {
            "customer_id": 40,
            "company_name": "Ristorantino",
            "contact_first_name": "Ricardo",
            "contact_last_name": "Trevisani",
            "phone_number": "+55 11 3063-0977",
            "address_line_1": "Rua Melo Alves, 674 - Cerqueira César",
            "email": "ricardo@ristorantino.com.br",
            "city": "Sao Paulo",
            "postalcode": "01417-010",
            "country": "Brazil",
            "self-closing": true
        },
        {
            "customer_id": 41,
            "company_name": "La Pergola",
            "contact_first_name": "Heinz",
            "contact_last_name": "Beck",
            "phone_number": "+39 06 3509 2152",
            "address_line_1": "Via Alberto Cadlolo, 101",
            "email": "lapergola@waldorfastoria.it",
            "city": "Rome",
            "postalcode": "00136",
            "country": "Italy",
            "self-closing": true
        },
        {
            "customer_id": 42,
            "company_name": "Shinyeh Dining",
            "contact_first_name": "Lee",
            "contact_last_name": "Xiu Ying",
            "phone_number": "+886 2 8101 0185",
            "address_line_1": "85F-1, No. 7, Sec. 5, Xinyi Rd., Xinyi Dist.",
            "email": "to-7@shinyeh.com.tw",
            "city": "Taipei",
            "country": "Taiwan",
            "self-closing": true
        },
        {
            "customer_id": 43,
            "company_name": "Tavolo 24",
            "contact_first_name": "Mingwan",
            "contact_last_name": "Choi",
            "phone_number": "+82 2-2276-3320",
            "address_line_1": "280, Cheonggyecheon-ro, Jongno-gu",
            "email": "choi@seoul.marriot.com",
            "city": "Seoul",
            "postalcode": "03198",
            "country": "South Korea",
            "self-closing": true
        },
        {
            "customer_id": 44,
            "company_name": "Maze",
            "contact_first_name": "Gordon",
            "contact_last_name": "Ramsey",
            "phone_number": "+44 20 7107 0000",
            "address_line_1": "10-13 Grosvenor Square, Mayfair",
            "email": "maze@gordonramsay.com",
            "city": "London",
            "postalcode": "W1K 6JP",
            "country": "Great Britain",
            "self-closing": true
        },
        {
            "customer_id": 45,
            "company_name": "Yen Chinese Restaurant",
            "contact_first_name": "Hoi Ming",
            "contact_last_name": "Wo",
            "phone_number": " +886 2 7703 8887",
            "address_line_1": "110 Zhongxiao East Road, Sec. 5",
            "email": "chef.bf.taipei@whotels.com",
            "city": "Taipei",
            "postalcode": "110",
            "country": "Taiwan",
            "self-closing": true
        },
        {
            "customer_id": 46,
            "company_name": "Tapas Molecular Bar",
            "contact_first_name": "Ngan",
            "contact_last_name": "Ping Chow",
            "phone_number": "+81 3-3270-8188",
            "address_line_1": "2-1-1 Nihonbashi Muromachi, Chuo-ku",
            "email": "motyo-fbres@mohg.com",
            "city": "Tokyo",
            "postalcode": "103-8328",
            "country": "Japan",
            "self-closing": true
        },
        {
            "customer_id": 47,
            "company_name": "Hakushu",
            "contact_first_name": "Suzie",
            "contact_last_name": "Ky",
            "phone_number": "+81 3-3461-0546",
            "address_line_1": "17-10 Sakuragaokacho",
            "email": "suziekitchen@hakushu.jp",
            "city": "Tokyo",
            "postalcode": "150-0031",
            "country": "Japan",
            "self-closing": true
        },
        {
            "customer_id": 48,
            "company_name": "Kyubey",
            "contact_first_name": "Yousuke",
            "contact_last_name": "Imada",
            "phone_number": "+81 3-3571-6523",
            "address_line_1": "7-6, Ginza 8-chome, Chuo",
            "email": "international@kyubey.jp",
            "city": "Tokyo",
            "postalcode": "104-0061",
            "country": "Japan",
            "self-closing": true
        },
        {
            "customer_id": 49,
            "company_name": "Cube Tasting Kitchen",
            "contact_first_name": "Bandile",
            "contact_last_name": "Kunwago",
            "phone_number": "+27 82 422 8158",
            "address_line_1": "24 Albrecht St.",
            "email": "kitchen@cubekitchen.co.za",
            "city": "Johannesburg",
            "postalcode": "2043",
            "country": "South Africa",
            "self-closing": true
        },
        {
            "customer_id": 50,
            "company_name": "Café Imperial",
            "contact_first_name": "Zdeněk",
            "contact_last_name": "Pohlreich",
            "phone_number": "+420 246 011 440",
            "address_line_1": "Na Poříčí 15",
            "email": "zdenda@pohlrech.cz",
            "city": "Prague",
            "postalcode": "1100",
            "country": "Czech Republic",
            "self-closing": true
        }
    ]

    const sampleStock = [
        {
            "stock_id": 1,
            "product_id": 2,
            "warehouse_id": 1,
            "quantity": 82,
            "self-closing": true
        },
        {
            "stock_id": 2,
            "product_id": 3,
            "warehouse_id": 1,
            "quantity": 51,
            "self-closing": true
        },
        {
            "stock_id": 3,
            "product_id": 4,
            "warehouse_id": 1,
            "quantity": 27,
            "self-closing": true
        },
        {
            "stock_id": 4,
            "product_id": 5,
            "warehouse_id": 1,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 5,
            "product_id": 6,
            "warehouse_id": 1,
            "quantity": 70,
            "self-closing": true
        },
        {
            "stock_id": 6,
            "product_id": 8,
            "warehouse_id": 1,
            "quantity": 34,
            "self-closing": true
        },
        {
            "stock_id": 7,
            "product_id": 9,
            "warehouse_id": 1,
            "quantity": 78,
            "self-closing": true
        },
        {
            "stock_id": 8,
            "product_id": 10,
            "warehouse_id": 1,
            "quantity": 33,
            "self-closing": true
        },
        {
            "stock_id": 9,
            "product_id": 11,
            "warehouse_id": 1,
            "quantity": 51,
            "self-closing": true
        },
        {
            "stock_id": 10,
            "product_id": 12,
            "warehouse_id": 1,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 11,
            "product_id": 14,
            "warehouse_id": 1,
            "quantity": 79,
            "self-closing": true
        },
        {
            "stock_id": 12,
            "product_id": 15,
            "warehouse_id": 1,
            "quantity": 50,
            "self-closing": true
        },
        {
            "stock_id": 13,
            "product_id": 16,
            "warehouse_id": 1,
            "quantity": 59,
            "self-closing": true
        },
        {
            "stock_id": 14,
            "product_id": 17,
            "warehouse_id": 1,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 15,
            "product_id": 18,
            "warehouse_id": 1,
            "quantity": 60,
            "self-closing": true
        },
        {
            "stock_id": 16,
            "product_id": 20,
            "warehouse_id": 1,
            "quantity": 60,
            "self-closing": true
        },
        {
            "stock_id": 17,
            "product_id": 21,
            "warehouse_id": 1,
            "quantity": 81,
            "self-closing": true
        },
        {
            "stock_id": 18,
            "product_id": 22,
            "warehouse_id": 1,
            "quantity": 69,
            "self-closing": true
        },
        {
            "stock_id": 19,
            "product_id": 23,
            "warehouse_id": 1,
            "quantity": 38,
            "self-closing": true
        },
        {
            "stock_id": 20,
            "product_id": 24,
            "warehouse_id": 1,
            "quantity": 37,
            "self-closing": true
        },
        {
            "stock_id": 21,
            "product_id": 26,
            "warehouse_id": 1,
            "quantity": 32,
            "self-closing": true
        },
        {
            "stock_id": 22,
            "product_id": 27,
            "warehouse_id": 1,
            "quantity": 19,
            "self-closing": true
        },
        {
            "stock_id": 23,
            "product_id": 28,
            "warehouse_id": 1,
            "quantity": 63,
            "self-closing": true
        },
        {
            "stock_id": 24,
            "product_id": 29,
            "warehouse_id": 1,
            "quantity": 82,
            "self-closing": true
        },
        {
            "stock_id": 25,
            "product_id": 30,
            "warehouse_id": 1,
            "quantity": 24,
            "self-closing": true
        },
        {
            "stock_id": 26,
            "product_id": 1,
            "warehouse_id": 2,
            "quantity": 77,
            "self-closing": true
        },
        {
            "stock_id": 27,
            "product_id": 3,
            "warehouse_id": 2,
            "quantity": 4,
            "self-closing": true
        },
        {
            "stock_id": 28,
            "product_id": 4,
            "warehouse_id": 2,
            "quantity": 87,
            "self-closing": true
        },
        {
            "stock_id": 29,
            "product_id": 5,
            "warehouse_id": 2,
            "quantity": 88,
            "self-closing": true
        },
        {
            "stock_id": 30,
            "product_id": 6,
            "warehouse_id": 2,
            "quantity": 26,
            "self-closing": true
        },
        {
            "stock_id": 31,
            "product_id": 7,
            "warehouse_id": 2,
            "quantity": 85,
            "self-closing": true
        },
        {
            "stock_id": 32,
            "product_id": 9,
            "warehouse_id": 2,
            "quantity": 71,
            "self-closing": true
        },
        {
            "stock_id": 33,
            "product_id": 10,
            "warehouse_id": 2,
            "quantity": 23,
            "self-closing": true
        },
        {
            "stock_id": 34,
            "product_id": 11,
            "warehouse_id": 2,
            "quantity": 85,
            "self-closing": true
        },
        {
            "stock_id": 35,
            "product_id": 12,
            "warehouse_id": 2,
            "quantity": 43,
            "self-closing": true
        },
        {
            "stock_id": 36,
            "product_id": 13,
            "warehouse_id": 2,
            "quantity": 76,
            "self-closing": true
        },
        {
            "stock_id": 37,
            "product_id": 15,
            "warehouse_id": 2,
            "quantity": 41,
            "self-closing": true
        },
        {
            "stock_id": 38,
            "product_id": 16,
            "warehouse_id": 2,
            "quantity": 85,
            "self-closing": true
        },
        {
            "stock_id": 39,
            "product_id": 17,
            "warehouse_id": 2,
            "quantity": 59,
            "self-closing": true
        },
        {
            "stock_id": 40,
            "product_id": 18,
            "warehouse_id": 2,
            "quantity": 85,
            "self-closing": true
        },
        {
            "stock_id": 41,
            "product_id": 19,
            "warehouse_id": 2,
            "quantity": 73,
            "self-closing": true
        },
        {
            "stock_id": 42,
            "product_id": 21,
            "warehouse_id": 2,
            "quantity": 45,
            "self-closing": true
        },
        {
            "stock_id": 43,
            "product_id": 22,
            "warehouse_id": 2,
            "quantity": 23,
            "self-closing": true
        },
        {
            "stock_id": 44,
            "product_id": 23,
            "warehouse_id": 2,
            "quantity": 53,
            "self-closing": true
        },
        {
            "stock_id": 45,
            "product_id": 24,
            "warehouse_id": 2,
            "quantity": 51,
            "self-closing": true
        },
        {
            "stock_id": 46,
            "product_id": 25,
            "warehouse_id": 2,
            "quantity": 40,
            "self-closing": true
        },
        {
            "stock_id": 47,
            "product_id": 27,
            "warehouse_id": 2,
            "quantity": 42,
            "self-closing": true
        },
        {
            "stock_id": 48,
            "product_id": 28,
            "warehouse_id": 2,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 49,
            "product_id": 29,
            "warehouse_id": 2,
            "quantity": 77,
            "self-closing": true
        },
        {
            "stock_id": 50,
            "product_id": 30,
            "warehouse_id": 2,
            "quantity": 17,
            "self-closing": true
        },
        {
            "stock_id": 51,
            "product_id": 1,
            "warehouse_id": 3,
            "quantity": 65,
            "self-closing": true
        },
        {
            "stock_id": 52,
            "product_id": 2,
            "warehouse_id": 3,
            "quantity": 26,
            "self-closing": true
        },
        {
            "stock_id": 53,
            "product_id": 3,
            "warehouse_id": 3,
            "quantity": 64,
            "self-closing": true
        },
        {
            "stock_id": 54,
            "product_id": 4,
            "warehouse_id": 3,
            "quantity": 69,
            "self-closing": true
        },
        {
            "stock_id": 55,
            "product_id": 6,
            "warehouse_id": 3,
            "quantity": 79,
            "self-closing": true
        },
        {
            "stock_id": 56,
            "product_id": 7,
            "warehouse_id": 3,
            "quantity": 33,
            "self-closing": true
        },
        {
            "stock_id": 57,
            "product_id": 8,
            "warehouse_id": 3,
            "quantity": 68,
            "self-closing": true
        },
        {
            "stock_id": 58,
            "product_id": 9,
            "warehouse_id": 3,
            "quantity": 71,
            "self-closing": true
        },
        {
            "stock_id": 59,
            "product_id": 10,
            "warehouse_id": 3,
            "quantity": 22,
            "self-closing": true
        },
        {
            "stock_id": 60,
            "product_id": 12,
            "warehouse_id": 3,
            "quantity": 65,
            "self-closing": true
        },
        {
            "stock_id": 61,
            "product_id": 13,
            "warehouse_id": 3,
            "quantity": 30,
            "self-closing": true
        },
        {
            "stock_id": 62,
            "product_id": 14,
            "warehouse_id": 3,
            "quantity": 75,
            "self-closing": true
        },
        {
            "stock_id": 63,
            "product_id": 15,
            "warehouse_id": 3,
            "quantity": 85,
            "self-closing": true
        },
        {
            "stock_id": 64,
            "product_id": 16,
            "warehouse_id": 3,
            "quantity": 54,
            "self-closing": true
        },
        {
            "stock_id": 65,
            "product_id": 18,
            "warehouse_id": 3,
            "quantity": 53,
            "self-closing": true
        },
        {
            "stock_id": 66,
            "product_id": 19,
            "warehouse_id": 3,
            "quantity": 68,
            "self-closing": true
        },
        {
            "stock_id": 67,
            "product_id": 20,
            "warehouse_id": 3,
            "quantity": 68,
            "self-closing": true
        },
        {
            "stock_id": 68,
            "product_id": 21,
            "warehouse_id": 3,
            "quantity": 57,
            "self-closing": true
        },
        {
            "stock_id": 69,
            "product_id": 22,
            "warehouse_id": 3,
            "quantity": 22,
            "self-closing": true
        },
        {
            "stock_id": 70,
            "product_id": 24,
            "warehouse_id": 3,
            "quantity": 88,
            "self-closing": true
        },
        {
            "stock_id": 71,
            "product_id": 25,
            "warehouse_id": 3,
            "quantity": 86,
            "self-closing": true
        },
        {
            "stock_id": 72,
            "product_id": 26,
            "warehouse_id": 3,
            "quantity": 90,
            "self-closing": true
        },
        {
            "stock_id": 73,
            "product_id": 27,
            "warehouse_id": 3,
            "quantity": 37,
            "self-closing": true
        },
        {
            "stock_id": 74,
            "product_id": 28,
            "warehouse_id": 3,
            "quantity": 82,
            "self-closing": true
        },
        {
            "stock_id": 75,
            "product_id": 30,
            "warehouse_id": 3,
            "quantity": 80,
            "self-closing": true
        },
        {
            "stock_id": 76,
            "product_id": 1,
            "warehouse_id": 4,
            "quantity": 84,
            "self-closing": true
        },
        {
            "stock_id": 77,
            "product_id": 2,
            "warehouse_id": 4,
            "quantity": 41,
            "self-closing": true
        },
        {
            "stock_id": 78,
            "product_id": 3,
            "warehouse_id": 4,
            "quantity": 76,
            "self-closing": true
        },
        {
            "stock_id": 79,
            "product_id": 5,
            "warehouse_id": 4,
            "quantity": 64,
            "self-closing": true
        },
        {
            "stock_id": 80,
            "product_id": 6,
            "warehouse_id": 4,
            "quantity": 34,
            "self-closing": true
        },
        {
            "stock_id": 81,
            "product_id": 7,
            "warehouse_id": 4,
            "quantity": 86,
            "self-closing": true
        },
        {
            "stock_id": 82,
            "product_id": 8,
            "warehouse_id": 4,
            "quantity": 81,
            "self-closing": true
        },
        {
            "stock_id": 83,
            "product_id": 9,
            "warehouse_id": 4,
            "quantity": 70,
            "self-closing": true
        },
        {
            "stock_id": 84,
            "product_id": 11,
            "warehouse_id": 4,
            "quantity": 80,
            "self-closing": true
        },
        {
            "stock_id": 85,
            "product_id": 12,
            "warehouse_id": 4,
            "quantity": 59,
            "self-closing": true
        },
        {
            "stock_id": 86,
            "product_id": 13,
            "warehouse_id": 4,
            "quantity": 28,
            "self-closing": true
        },
        {
            "stock_id": 87,
            "product_id": 14,
            "warehouse_id": 4,
            "quantity": 70,
            "self-closing": true
        },
        {
            "stock_id": 88,
            "product_id": 15,
            "warehouse_id": 4,
            "quantity": 22,
            "self-closing": true
        },
        {
            "stock_id": 89,
            "product_id": 17,
            "warehouse_id": 4,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 90,
            "product_id": 18,
            "warehouse_id": 4,
            "quantity": 17,
            "self-closing": true
        },
        {
            "stock_id": 91,
            "product_id": 19,
            "warehouse_id": 4,
            "quantity": 27,
            "self-closing": true
        },
        {
            "stock_id": 92,
            "product_id": 20,
            "warehouse_id": 4,
            "quantity": 41,
            "self-closing": true
        },
        {
            "stock_id": 93,
            "product_id": 21,
            "warehouse_id": 4,
            "quantity": 56,
            "self-closing": true
        },
        {
            "stock_id": 94,
            "product_id": 23,
            "warehouse_id": 4,
            "quantity": 29,
            "self-closing": true
        },
        {
            "stock_id": 95,
            "product_id": 24,
            "warehouse_id": 4,
            "quantity": 72,
            "self-closing": true
        },
        {
            "stock_id": 96,
            "product_id": 25,
            "warehouse_id": 4,
            "quantity": 44,
            "self-closing": true
        },
        {
            "stock_id": 97,
            "product_id": 26,
            "warehouse_id": 4,
            "quantity": 44,
            "self-closing": true
        },
        {
            "stock_id": 98,
            "product_id": 27,
            "warehouse_id": 4,
            "quantity": 79,
            "self-closing": true
        },
        {
            "stock_id": 99,
            "product_id": 29,
            "warehouse_id": 4,
            "quantity": 31,
            "self-closing": true
        },
        {
            "stock_id": 100,
            "product_id": 30,
            "warehouse_id": 4,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 101,
            "product_id": 1,
            "warehouse_id": 5,
            "quantity": 82,
            "self-closing": true
        },
        {
            "stock_id": 102,
            "product_id": 2,
            "warehouse_id": 5,
            "quantity": 51,
            "self-closing": true
        },
        {
            "stock_id": 103,
            "product_id": 3,
            "warehouse_id": 5,
            "quantity": 27,
            "self-closing": true
        },
        {
            "stock_id": 104,
            "product_id": 4,
            "warehouse_id": 5,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 105,
            "product_id": 5,
            "warehouse_id": 5,
            "quantity": 70,
            "self-closing": true
        },
        {
            "stock_id": 106,
            "product_id": 7,
            "warehouse_id": 5,
            "quantity": 34,
            "self-closing": true
        },
        {
            "stock_id": 107,
            "product_id": 8,
            "warehouse_id": 5,
            "quantity": 78,
            "self-closing": true
        },
        {
            "stock_id": 108,
            "product_id": 9,
            "warehouse_id": 5,
            "quantity": 33,
            "self-closing": true
        },
        {
            "stock_id": 109,
            "product_id": 10,
            "warehouse_id": 5,
            "quantity": 51,
            "self-closing": true
        },
        {
            "stock_id": 110,
            "product_id": 11,
            "warehouse_id": 5,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 111,
            "product_id": 13,
            "warehouse_id": 5,
            "quantity": 79,
            "self-closing": true
        },
        {
            "stock_id": 112,
            "product_id": 14,
            "warehouse_id": 5,
            "quantity": 50,
            "self-closing": true
        },
        {
            "stock_id": 113,
            "product_id": 15,
            "warehouse_id": 5,
            "quantity": 59,
            "self-closing": true
        },
        {
            "stock_id": 114,
            "product_id": 16,
            "warehouse_id": 5,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 115,
            "product_id": 17,
            "warehouse_id": 5,
            "quantity": 60,
            "self-closing": true
        },
        {
            "stock_id": 116,
            "product_id": 19,
            "warehouse_id": 5,
            "quantity": 60,
            "self-closing": true
        },
        {
            "stock_id": 117,
            "product_id": 20,
            "warehouse_id": 5,
            "quantity": 81,
            "self-closing": true
        },
        {
            "stock_id": 118,
            "product_id": 21,
            "warehouse_id": 5,
            "quantity": 69,
            "self-closing": true
        },
        {
            "stock_id": 119,
            "product_id": 22,
            "warehouse_id": 5,
            "quantity": 38,
            "self-closing": true
        },
        {
            "stock_id": 120,
            "product_id": 23,
            "warehouse_id": 5,
            "quantity": 37,
            "self-closing": true
        },
        {
            "stock_id": 121,
            "product_id": 25,
            "warehouse_id": 5,
            "quantity": 32,
            "self-closing": true
        },
        {
            "stock_id": 122,
            "product_id": 26,
            "warehouse_id": 5,
            "quantity": 19,
            "self-closing": true
        },
        {
            "stock_id": 123,
            "product_id": 27,
            "warehouse_id": 5,
            "quantity": 63,
            "self-closing": true
        },
        {
            "stock_id": 124,
            "product_id": 28,
            "warehouse_id": 5,
            "quantity": 82,
            "self-closing": true
        },
        {
            "stock_id": 125,
            "product_id": 29,
            "warehouse_id": 5,
            "quantity": 24,
            "self-closing": true
        },
        {
            "stock_id": 126,
            "product_id": 1,
            "warehouse_id": 6,
            "quantity": 77,
            "self-closing": true
        },
        {
            "stock_id": 127,
            "product_id": 2,
            "warehouse_id": 6,
            "quantity": 22,
            "self-closing": true
        },
        {
            "stock_id": 128,
            "product_id": 4,
            "warehouse_id": 6,
            "quantity": 87,
            "self-closing": true
        },
        {
            "stock_id": 129,
            "product_id": 5,
            "warehouse_id": 6,
            "quantity": 88,
            "self-closing": true
        },
        {
            "stock_id": 130,
            "product_id": 6,
            "warehouse_id": 6,
            "quantity": 26,
            "self-closing": true
        },
        {
            "stock_id": 131,
            "product_id": 7,
            "warehouse_id": 6,
            "quantity": 85,
            "self-closing": true
        },
        {
            "stock_id": 132,
            "product_id": 8,
            "warehouse_id": 6,
            "quantity": 71,
            "self-closing": true
        },
        {
            "stock_id": 133,
            "product_id": 10,
            "warehouse_id": 6,
            "quantity": 23,
            "self-closing": true
        },
        {
            "stock_id": 134,
            "product_id": 11,
            "warehouse_id": 6,
            "quantity": 85,
            "self-closing": true
        },
        {
            "stock_id": 135,
            "product_id": 12,
            "warehouse_id": 6,
            "quantity": 43,
            "self-closing": true
        },
        {
            "stock_id": 136,
            "product_id": 13,
            "warehouse_id": 6,
            "quantity": 76,
            "self-closing": true
        },
        {
            "stock_id": 137,
            "product_id": 14,
            "warehouse_id": 6,
            "quantity": 41,
            "self-closing": true
        },
        {
            "stock_id": 138,
            "product_id": 16,
            "warehouse_id": 6,
            "quantity": 85,
            "self-closing": true
        },
        {
            "stock_id": 139,
            "product_id": 17,
            "warehouse_id": 6,
            "quantity": 59,
            "self-closing": true
        },
        {
            "stock_id": 140,
            "product_id": 18,
            "warehouse_id": 6,
            "quantity": 85,
            "self-closing": true
        },
        {
            "stock_id": 141,
            "product_id": 19,
            "warehouse_id": 6,
            "quantity": 73,
            "self-closing": true
        },
        {
            "stock_id": 142,
            "product_id": 20,
            "warehouse_id": 6,
            "quantity": 45,
            "self-closing": true
        },
        {
            "stock_id": 143,
            "product_id": 22,
            "warehouse_id": 6,
            "quantity": 23,
            "self-closing": true
        },
        {
            "stock_id": 144,
            "product_id": 23,
            "warehouse_id": 6,
            "quantity": 53,
            "self-closing": true
        },
        {
            "stock_id": 145,
            "product_id": 24,
            "warehouse_id": 6,
            "quantity": 51,
            "self-closing": true
        },
        {
            "stock_id": 146,
            "product_id": 25,
            "warehouse_id": 6,
            "quantity": 40,
            "self-closing": true
        },
        {
            "stock_id": 147,
            "product_id": 26,
            "warehouse_id": 6,
            "quantity": 42,
            "self-closing": true
        },
        {
            "stock_id": 148,
            "product_id": 28,
            "warehouse_id": 6,
            "quantity": 21,
            "self-closing": true
        },
        {
            "stock_id": 149,
            "product_id": 29,
            "warehouse_id": 6,
            "quantity": 77,
            "self-closing": true
        },
        {
            "stock_id": 150,
            "product_id": 30,
            "warehouse_id": 6,
            "quantity": 17,
            "self-closing": true
        }
    ]

    const sampleInvoice = [
        {
            "invoice_id": 1,
            "customer_id": 46,
            "invoice_num": "1107",
            "invoice_date": "2015-09-30",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 2,
            "customer_id": 38,
            "invoice_num": "1290",
            "invoice_date": "2016-06-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 3,
            "customer_id": 1,
            "invoice_num": "1129",
            "invoice_date": "2016-05-24",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 4,
            "customer_id": 1,
            "invoice_num": "1111",
            "invoice_date": "2015-02-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 5,
            "customer_id": 47,
            "invoice_num": "1250",
            "invoice_date": "2015-01-07",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 6,
            "customer_id": 38,
            "invoice_num": "1136",
            "invoice_date": "2017-01-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 7,
            "customer_id": 24,
            "invoice_num": "1121",
            "invoice_date": "2015-11-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 8,
            "customer_id": 24,
            "invoice_num": "1298",
            "invoice_date": "2015-07-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 9,
            "customer_id": 24,
            "invoice_num": "1273",
            "invoice_date": "2016-08-24",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 10,
            "customer_id": 24,
            "invoice_num": "1206",
            "invoice_date": "2016-06-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 11,
            "customer_id": 24,
            "invoice_num": "1179",
            "invoice_date": "2016-11-15",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 12,
            "customer_id": 24,
            "invoice_num": "1081",
            "invoice_date": "2015-03-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 13,
            "customer_id": 24,
            "invoice_num": "1160",
            "invoice_date": "2015-10-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 14,
            "customer_id": 24,
            "invoice_num": "1074",
            "invoice_date": "2015-11-12",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 15,
            "customer_id": 4,
            "invoice_num": "1215",
            "invoice_date": "2016-09-24",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 16,
            "customer_id": 4,
            "invoice_num": "1088",
            "invoice_date": "2015-08-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 17,
            "customer_id": 4,
            "invoice_num": "1336",
            "invoice_date": "2018-04-10",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 18,
            "customer_id": 4,
            "invoice_num": "1283",
            "invoice_date": "2016-11-15",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 19,
            "customer_id": 4,
            "invoice_num": "1346",
            "invoice_date": "2016-04-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 20,
            "customer_id": 4,
            "invoice_num": "1084",
            "invoice_date": "2016-04-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 21,
            "customer_id": 4,
            "invoice_num": "1208",
            "invoice_date": "2015-01-31",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 22,
            "customer_id": 4,
            "invoice_num": "1180",
            "invoice_date": "2016-06-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 23,
            "customer_id": 4,
            "invoice_num": "1099",
            "invoice_date": "2015-07-21",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 24,
            "customer_id": 9,
            "invoice_num": "1236",
            "invoice_date": "2015-09-01",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 25,
            "customer_id": 9,
            "invoice_num": "1335",
            "invoice_date": "2015-06-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 26,
            "customer_id": 9,
            "invoice_num": "1077",
            "invoice_date": "2015-01-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 27,
            "customer_id": 9,
            "invoice_num": "1256",
            "invoice_date": "2016-03-14",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 28,
            "customer_id": 9,
            "invoice_num": "1001",
            "invoice_date": "2015-12-27",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 29,
            "customer_id": 9,
            "invoice_num": "1214",
            "invoice_date": "2016-07-18",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 30,
            "customer_id": 9,
            "invoice_num": "1052",
            "invoice_date": "2016-06-04",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 31,
            "customer_id": 39,
            "invoice_num": "1105",
            "invoice_date": "2015-09-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 32,
            "customer_id": 39,
            "invoice_num": "1395",
            "invoice_date": "2016-05-05",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 33,
            "customer_id": 39,
            "invoice_num": "1053",
            "invoice_date": "2015-01-29",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 34,
            "customer_id": 39,
            "invoice_num": "1124",
            "invoice_date": "2015-03-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 35,
            "customer_id": 39,
            "invoice_num": "1260",
            "invoice_date": "2016-03-18",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 36,
            "customer_id": 39,
            "invoice_num": "1200",
            "invoice_date": "2015-03-10",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 37,
            "customer_id": 39,
            "invoice_num": "1209",
            "invoice_date": "2016-10-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 38,
            "customer_id": 39,
            "invoice_num": "1005",
            "invoice_date": "2016-05-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 39,
            "customer_id": 1,
            "invoice_num": "1010",
            "invoice_date": "2018-01-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 40,
            "customer_id": 47,
            "invoice_num": "1009",
            "invoice_date": "2017-01-01",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 41,
            "customer_id": 1,
            "invoice_num": "1006",
            "invoice_date": "2017-01-31",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 42,
            "customer_id": 11,
            "invoice_num": "1011",
            "invoice_date": "2018-01-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 43,
            "customer_id": 38,
            "invoice_num": "1014",
            "invoice_date": "2018-01-12",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 44,
            "customer_id": 9,
            "invoice_num": "1037",
            "invoice_date": "2018-01-13",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 45,
            "customer_id": 23,
            "invoice_num": "1018",
            "invoice_date": "2018-03-05",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 46,
            "customer_id": 47,
            "invoice_num": "1019",
            "invoice_date": "2018-03-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 47,
            "customer_id": 47,
            "invoice_num": "1025",
            "invoice_date": "2018-03-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 48,
            "customer_id": 42,
            "invoice_num": "1046",
            "invoice_date": "2018-03-22",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 49,
            "customer_id": 16,
            "invoice_num": "1292",
            "invoice_date": "2015-07-03",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 50,
            "customer_id": 16,
            "invoice_num": "1154",
            "invoice_date": "2016-08-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 51,
            "customer_id": 16,
            "invoice_num": "1291",
            "invoice_date": "2015-06-23",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 52,
            "customer_id": 16,
            "invoice_num": "1366",
            "invoice_date": "2016-05-09",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 53,
            "customer_id": 16,
            "invoice_num": "1345",
            "invoice_date": "2015-02-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 54,
            "customer_id": 16,
            "invoice_num": "1240",
            "invoice_date": "2015-05-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 55,
            "customer_id": 16,
            "invoice_num": "1149",
            "invoice_date": "2017-01-17",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 56,
            "customer_id": 16,
            "invoice_num": "1076",
            "invoice_date": "2016-12-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 57,
            "customer_id": 16,
            "invoice_num": "1238",
            "invoice_date": "2017-01-21",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 58,
            "customer_id": 16,
            "invoice_num": "1031",
            "invoice_date": "2016-09-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 59,
            "customer_id": 33,
            "invoice_num": "1262",
            "invoice_date": "2016-03-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 60,
            "customer_id": 33,
            "invoice_num": "1228",
            "invoice_date": "2015-05-05",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 61,
            "customer_id": 33,
            "invoice_num": "1135",
            "invoice_date": "2016-08-09",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 62,
            "customer_id": 33,
            "invoice_num": "1309",
            "invoice_date": "2016-11-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 63,
            "customer_id": 33,
            "invoice_num": "1282",
            "invoice_date": "2015-03-21",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 64,
            "customer_id": 33,
            "invoice_num": "1092",
            "invoice_date": "2016-04-22",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 65,
            "customer_id": 33,
            "invoice_num": "1148",
            "invoice_date": "2016-09-20",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 66,
            "customer_id": 28,
            "invoice_num": "1133",
            "invoice_date": "2016-05-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 67,
            "customer_id": 28,
            "invoice_num": "1266",
            "invoice_date": "2016-11-05",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 68,
            "customer_id": 28,
            "invoice_num": "1106",
            "invoice_date": "2016-11-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 69,
            "customer_id": 28,
            "invoice_num": "1060",
            "invoice_date": "2015-12-28",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 70,
            "customer_id": 28,
            "invoice_num": "1249",
            "invoice_date": "2016-05-25",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 71,
            "customer_id": 28,
            "invoice_num": "1303",
            "invoice_date": "2015-10-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 72,
            "customer_id": 28,
            "invoice_num": "1259",
            "invoice_date": "2016-06-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 73,
            "customer_id": 28,
            "invoice_num": "1355",
            "invoice_date": "2016-07-26",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 74,
            "customer_id": 28,
            "invoice_num": "1062",
            "invoice_date": "2015-01-24",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 75,
            "customer_id": 50,
            "invoice_num": "1047",
            "invoice_date": "2018-03-29",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 76,
            "customer_id": 50,
            "invoice_num": "1024",
            "invoice_date": "2018-02-06",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 77,
            "customer_id": 42,
            "invoice_num": "1015",
            "invoice_date": "2018-02-09",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 78,
            "customer_id": 11,
            "invoice_num": "1032",
            "invoice_date": "2018-02-25",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 79,
            "customer_id": 38,
            "invoice_num": "1040",
            "invoice_date": "2018-03-18",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 80,
            "customer_id": 23,
            "invoice_num": "1041",
            "invoice_date": "2018-03-21",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 81,
            "customer_id": 38,
            "invoice_num": "1028",
            "invoice_date": "2018-09-08",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 82,
            "customer_id": 11,
            "invoice_num": "1023",
            "invoice_date": "2018-09-09",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 83,
            "customer_id": 11,
            "invoice_num": "1017",
            "invoice_date": "2017-06-05",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 84,
            "customer_id": 20,
            "invoice_num": "1254",
            "invoice_date": "2015-01-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 85,
            "customer_id": 20,
            "invoice_num": "1086",
            "invoice_date": "2015-03-07",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 86,
            "customer_id": 20,
            "invoice_num": "1393",
            "invoice_date": "2017-01-30",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 87,
            "customer_id": 20,
            "invoice_num": "1119",
            "invoice_date": "2016-08-23",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 88,
            "customer_id": 20,
            "invoice_num": "1302",
            "invoice_date": "2015-10-15",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 89,
            "customer_id": 20,
            "invoice_num": "1351",
            "invoice_date": "2016-11-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 90,
            "customer_id": 37,
            "invoice_num": "1289",
            "invoice_date": "2015-10-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 91,
            "customer_id": 37,
            "invoice_num": "1008",
            "invoice_date": "2016-03-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 92,
            "customer_id": 37,
            "invoice_num": "1334",
            "invoice_date": "2015-04-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 93,
            "customer_id": 37,
            "invoice_num": "1004",
            "invoice_date": "2016-10-04",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 94,
            "customer_id": 37,
            "invoice_num": "1108",
            "invoice_date": "2015-06-08",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 95,
            "customer_id": 37,
            "invoice_num": "1226",
            "invoice_date": "2015-11-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 96,
            "customer_id": 23,
            "invoice_num": "1096",
            "invoice_date": "2016-11-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 97,
            "customer_id": 23,
            "invoice_num": "1189",
            "invoice_date": "2016-04-26",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 98,
            "customer_id": 23,
            "invoice_num": "1359",
            "invoice_date": "2015-04-03",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 99,
            "customer_id": 23,
            "invoice_num": "1012",
            "invoice_date": "2015-03-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 100,
            "customer_id": 23,
            "invoice_num": "1380",
            "invoice_date": "2016-08-06",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 101,
            "customer_id": 23,
            "invoice_num": "1143",
            "invoice_date": "2015-12-25",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 102,
            "customer_id": 23,
            "invoice_num": "1378",
            "invoice_date": "2016-09-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 103,
            "customer_id": 43,
            "invoice_num": "1079",
            "invoice_date": "2016-10-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 104,
            "customer_id": 43,
            "invoice_num": "1272",
            "invoice_date": "2016-10-04",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 105,
            "customer_id": 43,
            "invoice_num": "1275",
            "invoice_date": "2015-09-02",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 106,
            "customer_id": 43,
            "invoice_num": "1112",
            "invoice_date": "2015-01-24",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 107,
            "customer_id": 43,
            "invoice_num": "1264",
            "invoice_date": "2015-12-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 108,
            "customer_id": 43,
            "invoice_num": "1219",
            "invoice_date": "2015-06-17",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 109,
            "customer_id": 43,
            "invoice_num": "1196",
            "invoice_date": "2016-08-22",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 110,
            "customer_id": 43,
            "invoice_num": "1069",
            "invoice_date": "2015-06-07",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 111,
            "customer_id": 32,
            "invoice_num": "1085",
            "invoice_date": "2017-02-21",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 112,
            "customer_id": 32,
            "invoice_num": "1392",
            "invoice_date": "2016-09-01",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 113,
            "customer_id": 32,
            "invoice_num": "1176",
            "invoice_date": "2017-01-17",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 114,
            "customer_id": 32,
            "invoice_num": "1199",
            "invoice_date": "2017-01-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 115,
            "customer_id": 32,
            "invoice_num": "1311",
            "invoice_date": "2015-06-13",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 116,
            "customer_id": 32,
            "invoice_num": "1102",
            "invoice_date": "2015-11-27",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 117,
            "customer_id": 32,
            "invoice_num": "1020",
            "invoice_date": "2015-12-22",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 118,
            "customer_id": 32,
            "invoice_num": "1235",
            "invoice_date": "2015-11-12",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 119,
            "customer_id": 32,
            "invoice_num": "1078",
            "invoice_date": "2015-06-05",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 120,
            "customer_id": 32,
            "invoice_num": "1167",
            "invoice_date": "2015-03-27",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 121,
            "customer_id": 6,
            "invoice_num": "1212",
            "invoice_date": "2016-11-13",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 122,
            "customer_id": 6,
            "invoice_num": "1328",
            "invoice_date": "2017-01-28",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 123,
            "customer_id": 6,
            "invoice_num": "1321",
            "invoice_date": "2015-07-24",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 124,
            "customer_id": 6,
            "invoice_num": "1337",
            "invoice_date": "2015-04-21",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 125,
            "customer_id": 6,
            "invoice_num": "1070",
            "invoice_date": "2017-02-06",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 126,
            "customer_id": 6,
            "invoice_num": "1229",
            "invoice_date": "2015-04-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 127,
            "customer_id": 6,
            "invoice_num": "1339",
            "invoice_date": "2016-02-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 128,
            "customer_id": 6,
            "invoice_num": "1367",
            "invoice_date": "2016-09-04",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 129,
            "customer_id": 6,
            "invoice_num": "1227",
            "invoice_date": "2015-10-21",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 130,
            "customer_id": 6,
            "invoice_num": "1116",
            "invoice_date": "2016-11-18",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 131,
            "customer_id": 12,
            "invoice_num": "1172",
            "invoice_date": "2016-12-18",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 132,
            "customer_id": 12,
            "invoice_num": "1131",
            "invoice_date": "2015-01-31",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 133,
            "customer_id": 12,
            "invoice_num": "1130",
            "invoice_date": "2015-06-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 134,
            "customer_id": 12,
            "invoice_num": "1398",
            "invoice_date": "2016-06-30",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 135,
            "customer_id": 12,
            "invoice_num": "1146",
            "invoice_date": "2016-07-21",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 136,
            "customer_id": 12,
            "invoice_num": "1243",
            "invoice_date": "2016-08-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 137,
            "customer_id": 12,
            "invoice_num": "1118",
            "invoice_date": "2015-11-15",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 138,
            "customer_id": 12,
            "invoice_num": "1191",
            "invoice_date": "2017-01-31",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 139,
            "customer_id": 22,
            "invoice_num": "1386",
            "invoice_date": "2016-09-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 140,
            "customer_id": 22,
            "invoice_num": "1097",
            "invoice_date": "2016-01-30",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 141,
            "customer_id": 22,
            "invoice_num": "1013",
            "invoice_date": "2016-01-29",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 142,
            "customer_id": 22,
            "invoice_num": "1261",
            "invoice_date": "2015-03-28",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 143,
            "customer_id": 22,
            "invoice_num": "1349",
            "invoice_date": "2016-07-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 144,
            "customer_id": 22,
            "invoice_num": "1276",
            "invoice_date": "2015-08-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 145,
            "customer_id": 22,
            "invoice_num": "1344",
            "invoice_date": "2016-02-23",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 146,
            "customer_id": 22,
            "invoice_num": "1326",
            "invoice_date": "2016-10-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 147,
            "customer_id": 22,
            "invoice_num": "1242",
            "invoice_date": "2016-11-20",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 148,
            "customer_id": 49,
            "invoice_num": "1293",
            "invoice_date": "2015-02-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 149,
            "customer_id": 49,
            "invoice_num": "1399",
            "invoice_date": "2015-08-31",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 150,
            "customer_id": 49,
            "invoice_num": "1058",
            "invoice_date": "2016-01-04",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 151,
            "customer_id": 49,
            "invoice_num": "1340",
            "invoice_date": "2016-10-24",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 152,
            "customer_id": 49,
            "invoice_num": "1300",
            "invoice_date": "2016-07-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 153,
            "customer_id": 49,
            "invoice_num": "1066",
            "invoice_date": "2015-10-25",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 154,
            "customer_id": 49,
            "invoice_num": "1183",
            "invoice_date": "2015-12-10",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 155,
            "customer_id": 11,
            "invoice_num": "1048",
            "invoice_date": "2017-06-14",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 156,
            "customer_id": 11,
            "invoice_num": "1016",
            "invoice_date": "2017-06-30",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 157,
            "customer_id": 1,
            "invoice_num": "1043",
            "invoice_date": "2017-08-21",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 158,
            "customer_id": 50,
            "invoice_num": "1022",
            "invoice_date": "2017-09-24",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 159,
            "customer_id": 50,
            "invoice_num": "1044",
            "invoice_date": "2017-10-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 160,
            "customer_id": 50,
            "invoice_num": "1029",
            "invoice_date": "2017-09-13",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 161,
            "customer_id": 30,
            "invoice_num": "1091",
            "invoice_date": "2016-04-18",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 162,
            "customer_id": 30,
            "invoice_num": "1251",
            "invoice_date": "2015-02-17",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 163,
            "customer_id": 30,
            "invoice_num": "1286",
            "invoice_date": "2016-08-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 164,
            "customer_id": 30,
            "invoice_num": "1197",
            "invoice_date": "2016-01-13",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 165,
            "customer_id": 30,
            "invoice_num": "1050",
            "invoice_date": "2016-12-23",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 166,
            "customer_id": 30,
            "invoice_num": "1320",
            "invoice_date": "2016-11-20",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 167,
            "customer_id": 34,
            "invoice_num": "1269",
            "invoice_date": "2015-01-27",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 168,
            "customer_id": 34,
            "invoice_num": "1218",
            "invoice_date": "2016-07-10",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 169,
            "customer_id": 34,
            "invoice_num": "1268",
            "invoice_date": "2016-08-06",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 170,
            "customer_id": 34,
            "invoice_num": "1389",
            "invoice_date": "2015-01-28",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 171,
            "customer_id": 34,
            "invoice_num": "1382",
            "invoice_date": "2015-07-06",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 172,
            "customer_id": 34,
            "invoice_num": "1356",
            "invoice_date": "2015-02-24",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 173,
            "customer_id": 34,
            "invoice_num": "1325",
            "invoice_date": "2015-03-22",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 174,
            "customer_id": 34,
            "invoice_num": "1332",
            "invoice_date": "2016-04-12",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 175,
            "customer_id": 26,
            "invoice_num": "1181",
            "invoice_date": "2016-02-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 176,
            "customer_id": 26,
            "invoice_num": "1152",
            "invoice_date": "2015-11-07",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 177,
            "customer_id": 26,
            "invoice_num": "1115",
            "invoice_date": "2015-09-29",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 178,
            "customer_id": 26,
            "invoice_num": "1394",
            "invoice_date": "2015-06-09",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 179,
            "customer_id": 26,
            "invoice_num": "1239",
            "invoice_date": "2016-04-03",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 180,
            "customer_id": 26,
            "invoice_num": "1207",
            "invoice_date": "2015-03-06",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 181,
            "customer_id": 26,
            "invoice_num": "1310",
            "invoice_date": "2015-10-29",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 182,
            "customer_id": 26,
            "invoice_num": "1162",
            "invoice_date": "2016-05-23",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 183,
            "customer_id": 26,
            "invoice_num": "1221",
            "invoice_date": "2016-07-07",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 184,
            "customer_id": 26,
            "invoice_num": "1089",
            "invoice_date": "2017-01-13",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 185,
            "customer_id": 36,
            "invoice_num": "1274",
            "invoice_date": "2016-02-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 186,
            "customer_id": 36,
            "invoice_num": "1171",
            "invoice_date": "2016-12-14",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 187,
            "customer_id": 36,
            "invoice_num": "1204",
            "invoice_date": "2015-09-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 188,
            "customer_id": 36,
            "invoice_num": "1127",
            "invoice_date": "2016-05-07",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 189,
            "customer_id": 36,
            "invoice_num": "1165",
            "invoice_date": "2015-02-04",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 190,
            "customer_id": 36,
            "invoice_num": "1322",
            "invoice_date": "2015-08-12",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 191,
            "customer_id": 36,
            "invoice_num": "1184",
            "invoice_date": "2017-01-13",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 192,
            "customer_id": 36,
            "invoice_num": "1232",
            "invoice_date": "2016-05-10",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 193,
            "customer_id": 36,
            "invoice_num": "1296",
            "invoice_date": "2015-08-10",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 194,
            "customer_id": 36,
            "invoice_num": "1210",
            "invoice_date": "2016-08-24",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 195,
            "customer_id": 46,
            "invoice_num": "1138",
            "invoice_date": "2015-08-26",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 196,
            "customer_id": 46,
            "invoice_num": "1267",
            "invoice_date": "2017-01-27",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 197,
            "customer_id": 46,
            "invoice_num": "1195",
            "invoice_date": "2016-12-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 198,
            "customer_id": 46,
            "invoice_num": "1263",
            "invoice_date": "2017-02-01",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 199,
            "customer_id": 46,
            "invoice_num": "1094",
            "invoice_date": "2015-04-01",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 200,
            "customer_id": 46,
            "invoice_num": "1220",
            "invoice_date": "2015-10-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 201,
            "customer_id": 46,
            "invoice_num": "1193",
            "invoice_date": "2015-01-16",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 202,
            "customer_id": 46,
            "invoice_num": "1163",
            "invoice_date": "2015-01-06",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 203,
            "customer_id": 46,
            "invoice_num": "1087",
            "invoice_date": "2016-10-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 204,
            "customer_id": 37,
            "invoice_num": "1075",
            "invoice_date": "2015-10-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 205,
            "customer_id": 19,
            "invoice_num": "1064",
            "invoice_date": "2015-08-17",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 206,
            "customer_id": 19,
            "invoice_num": "1203",
            "invoice_date": "2015-10-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 207,
            "customer_id": 19,
            "invoice_num": "1186",
            "invoice_date": "2016-06-06",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 208,
            "customer_id": 19,
            "invoice_num": "1103",
            "invoice_date": "2017-02-17",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 209,
            "customer_id": 19,
            "invoice_num": "1137",
            "invoice_date": "2015-04-06",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 210,
            "customer_id": 19,
            "invoice_num": "1216",
            "invoice_date": "2015-09-22",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 211,
            "customer_id": 41,
            "invoice_num": "1233",
            "invoice_date": "2016-09-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 212,
            "customer_id": 41,
            "invoice_num": "1377",
            "invoice_date": "2016-08-23",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 213,
            "customer_id": 41,
            "invoice_num": "1365",
            "invoice_date": "2015-08-16",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 214,
            "customer_id": 41,
            "invoice_num": "1224",
            "invoice_date": "2016-02-15",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 215,
            "customer_id": 41,
            "invoice_num": "1057",
            "invoice_date": "2015-04-14",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 216,
            "customer_id": 41,
            "invoice_num": "1370",
            "invoice_date": "2015-11-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 217,
            "customer_id": 41,
            "invoice_num": "1390",
            "invoice_date": "2015-03-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 218,
            "customer_id": 29,
            "invoice_num": "1122",
            "invoice_date": "2015-06-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 219,
            "customer_id": 29,
            "invoice_num": "1252",
            "invoice_date": "2016-06-12",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 220,
            "customer_id": 29,
            "invoice_num": "1387",
            "invoice_date": "2016-05-17",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 221,
            "customer_id": 29,
            "invoice_num": "1090",
            "invoice_date": "2015-10-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 222,
            "customer_id": 29,
            "invoice_num": "1234",
            "invoice_date": "2016-04-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 223,
            "customer_id": 29,
            "invoice_num": "1315",
            "invoice_date": "2016-04-21",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 224,
            "customer_id": 29,
            "invoice_num": "1132",
            "invoice_date": "2016-11-03",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 225,
            "customer_id": 29,
            "invoice_num": "1358",
            "invoice_date": "2016-02-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 226,
            "customer_id": 15,
            "invoice_num": "1305",
            "invoice_date": "2015-11-18",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 227,
            "customer_id": 15,
            "invoice_num": "1027",
            "invoice_date": "2016-06-05",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 228,
            "customer_id": 15,
            "invoice_num": "1038",
            "invoice_date": "2016-03-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 229,
            "customer_id": 15,
            "invoice_num": "1211",
            "invoice_date": "2016-09-21",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 230,
            "customer_id": 15,
            "invoice_num": "1295",
            "invoice_date": "2016-08-22",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 231,
            "customer_id": 15,
            "invoice_num": "1304",
            "invoice_date": "2016-02-04",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 232,
            "customer_id": 15,
            "invoice_num": "1257",
            "invoice_date": "2015-02-02",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 233,
            "customer_id": 15,
            "invoice_num": "1113",
            "invoice_date": "2016-05-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 234,
            "customer_id": 15,
            "invoice_num": "1376",
            "invoice_date": "2015-02-09",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 235,
            "customer_id": 15,
            "invoice_num": "1177",
            "invoice_date": "2015-11-23",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 236,
            "customer_id": 31,
            "invoice_num": "1361",
            "invoice_date": "2016-06-10",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 237,
            "customer_id": 31,
            "invoice_num": "1230",
            "invoice_date": "2016-06-26",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 238,
            "customer_id": 31,
            "invoice_num": "1371",
            "invoice_date": "2015-09-08",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 239,
            "customer_id": 31,
            "invoice_num": "1153",
            "invoice_date": "2016-09-09",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 240,
            "customer_id": 31,
            "invoice_num": "1270",
            "invoice_date": "2015-03-11",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 241,
            "customer_id": 31,
            "invoice_num": "1330",
            "invoice_date": "2016-04-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 242,
            "customer_id": 27,
            "invoice_num": "1117",
            "invoice_date": "2016-09-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 243,
            "customer_id": 27,
            "invoice_num": "1114",
            "invoice_date": "2016-03-24",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 244,
            "customer_id": 27,
            "invoice_num": "1061",
            "invoice_date": "2015-09-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 245,
            "customer_id": 27,
            "invoice_num": "1145",
            "invoice_date": "2015-07-10",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 246,
            "customer_id": 27,
            "invoice_num": "1051",
            "invoice_date": "2016-11-14",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 247,
            "customer_id": 27,
            "invoice_num": "1280",
            "invoice_date": "2015-11-24",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 248,
            "customer_id": 27,
            "invoice_num": "1255",
            "invoice_date": "2016-02-04",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 249,
            "customer_id": 45,
            "invoice_num": "1316",
            "invoice_date": "2016-05-02",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 250,
            "customer_id": 45,
            "invoice_num": "1278",
            "invoice_date": "2015-05-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 251,
            "customer_id": 45,
            "invoice_num": "1237",
            "invoice_date": "2015-10-24",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 252,
            "customer_id": 45,
            "invoice_num": "1383",
            "invoice_date": "2016-04-27",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 253,
            "customer_id": 45,
            "invoice_num": "1247",
            "invoice_date": "2016-11-27",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 254,
            "customer_id": 45,
            "invoice_num": "1353",
            "invoice_date": "2016-07-10",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 255,
            "customer_id": 45,
            "invoice_num": "1329",
            "invoice_date": "2016-01-02",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 256,
            "customer_id": 45,
            "invoice_num": "1159",
            "invoice_date": "2015-02-28",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 257,
            "customer_id": 45,
            "invoice_num": "1190",
            "invoice_date": "2016-07-30",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 258,
            "customer_id": 45,
            "invoice_num": "1109",
            "invoice_date": "2015-02-26",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 259,
            "customer_id": 7,
            "invoice_num": "1225",
            "invoice_date": "2015-04-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 260,
            "customer_id": 7,
            "invoice_num": "1343",
            "invoice_date": "2016-04-06",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 261,
            "customer_id": 7,
            "invoice_num": "1063",
            "invoice_date": "2015-08-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 262,
            "customer_id": 7,
            "invoice_num": "1381",
            "invoice_date": "2015-09-21",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 263,
            "customer_id": 7,
            "invoice_num": "1375",
            "invoice_date": "2015-01-06",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 264,
            "customer_id": 7,
            "invoice_num": "1198",
            "invoice_date": "2015-02-18",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 265,
            "customer_id": 7,
            "invoice_num": "1045",
            "invoice_date": "2016-04-26",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 266,
            "customer_id": 7,
            "invoice_num": "1095",
            "invoice_date": "2015-10-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 267,
            "customer_id": 7,
            "invoice_num": "1002",
            "invoice_date": "2016-10-20",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 268,
            "customer_id": 35,
            "invoice_num": "1342",
            "invoice_date": "2015-09-10",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 269,
            "customer_id": 35,
            "invoice_num": "1285",
            "invoice_date": "2016-12-06",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 270,
            "customer_id": 35,
            "invoice_num": "1248",
            "invoice_date": "2016-03-09",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 271,
            "customer_id": 35,
            "invoice_num": "1205",
            "invoice_date": "2015-09-20",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 272,
            "customer_id": 35,
            "invoice_num": "1073",
            "invoice_date": "2016-04-06",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 273,
            "customer_id": 35,
            "invoice_num": "1059",
            "invoice_date": "2015-03-13",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 274,
            "customer_id": 35,
            "invoice_num": "1188",
            "invoice_date": "2016-04-07",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 275,
            "customer_id": 35,
            "invoice_num": "1072",
            "invoice_date": "2015-09-25",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 276,
            "customer_id": 35,
            "invoice_num": "1110",
            "invoice_date": "2016-04-23",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 277,
            "customer_id": 5,
            "invoice_num": "1080",
            "invoice_date": "2015-06-22",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 278,
            "customer_id": 5,
            "invoice_num": "1134",
            "invoice_date": "2017-02-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 279,
            "customer_id": 5,
            "invoice_num": "1182",
            "invoice_date": "2015-03-30",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 280,
            "customer_id": 5,
            "invoice_num": "1068",
            "invoice_date": "2016-01-11",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 281,
            "customer_id": 5,
            "invoice_num": "1144",
            "invoice_date": "2016-08-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 282,
            "customer_id": 5,
            "invoice_num": "1213",
            "invoice_date": "2015-05-26",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 283,
            "customer_id": 5,
            "invoice_num": "1314",
            "invoice_date": "2016-02-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 284,
            "customer_id": 5,
            "invoice_num": "1324",
            "invoice_date": "2016-12-30",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 285,
            "customer_id": 5,
            "invoice_num": "1297",
            "invoice_date": "2016-08-29",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 286,
            "customer_id": 5,
            "invoice_num": "1104",
            "invoice_date": "2017-02-05",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 287,
            "customer_id": 3,
            "invoice_num": "1246",
            "invoice_date": "2015-12-31",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 288,
            "customer_id": 3,
            "invoice_num": "1277",
            "invoice_date": "2015-01-30",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 289,
            "customer_id": 3,
            "invoice_num": "1161",
            "invoice_date": "2016-06-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 290,
            "customer_id": 3,
            "invoice_num": "1201",
            "invoice_date": "2016-12-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 291,
            "customer_id": 3,
            "invoice_num": "1155",
            "invoice_date": "2016-01-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 292,
            "customer_id": 3,
            "invoice_num": "1245",
            "invoice_date": "2015-03-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 293,
            "customer_id": 3,
            "invoice_num": "1258",
            "invoice_date": "2016-05-09",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 294,
            "customer_id": 3,
            "invoice_num": "1279",
            "invoice_date": "2016-06-28",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 295,
            "customer_id": 3,
            "invoice_num": "1036",
            "invoice_date": "2015-11-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 296,
            "customer_id": 40,
            "invoice_num": "1093",
            "invoice_date": "2015-07-26",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 297,
            "customer_id": 40,
            "invoice_num": "1202",
            "invoice_date": "2015-08-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 298,
            "customer_id": 40,
            "invoice_num": "1372",
            "invoice_date": "2015-02-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 299,
            "customer_id": 40,
            "invoice_num": "1187",
            "invoice_date": "2016-02-06",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 300,
            "customer_id": 40,
            "invoice_num": "1055",
            "invoice_date": "2015-04-28",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 301,
            "customer_id": 40,
            "invoice_num": "1397",
            "invoice_date": "2015-01-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 302,
            "customer_id": 40,
            "invoice_num": "1294",
            "invoice_date": "2015-03-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 303,
            "customer_id": 13,
            "invoice_num": "1391",
            "invoice_date": "2015-02-17",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 304,
            "customer_id": 13,
            "invoice_num": "1169",
            "invoice_date": "2015-04-22",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 305,
            "customer_id": 13,
            "invoice_num": "1217",
            "invoice_date": "2016-04-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 306,
            "customer_id": 13,
            "invoice_num": "1318",
            "invoice_date": "2016-03-17",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 307,
            "customer_id": 13,
            "invoice_num": "1385",
            "invoice_date": "2016-12-11",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 308,
            "customer_id": 13,
            "invoice_num": "1185",
            "invoice_date": "2016-10-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 309,
            "customer_id": 13,
            "invoice_num": "1312",
            "invoice_date": "2016-12-13",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 310,
            "customer_id": 14,
            "invoice_num": "1287",
            "invoice_date": "2015-03-07",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 311,
            "customer_id": 14,
            "invoice_num": "1357",
            "invoice_date": "2016-02-02",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 312,
            "customer_id": 14,
            "invoice_num": "1150",
            "invoice_date": "2015-03-09",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 313,
            "customer_id": 14,
            "invoice_num": "1271",
            "invoice_date": "2017-01-06",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 314,
            "customer_id": 1,
            "invoice_num": "1156",
            "invoice_date": "2016-11-18",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 315,
            "customer_id": 14,
            "invoice_num": "1098",
            "invoice_date": "2016-09-10",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 316,
            "customer_id": 14,
            "invoice_num": "1319",
            "invoice_date": "2016-05-17",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 317,
            "customer_id": 14,
            "invoice_num": "1175",
            "invoice_date": "2017-02-05",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 318,
            "customer_id": 14,
            "invoice_num": "1333",
            "invoice_date": "2016-05-12",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 319,
            "customer_id": 10,
            "invoice_num": "1388",
            "invoice_date": "2017-02-02",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 320,
            "customer_id": 10,
            "invoice_num": "1288",
            "invoice_date": "2016-08-31",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 321,
            "customer_id": 10,
            "invoice_num": "1139",
            "invoice_date": "2016-12-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 322,
            "customer_id": 10,
            "invoice_num": "1083",
            "invoice_date": "2015-08-18",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 323,
            "customer_id": 10,
            "invoice_num": "1120",
            "invoice_date": "2016-06-01",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 324,
            "customer_id": 10,
            "invoice_num": "1379",
            "invoice_date": "2016-09-23",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 325,
            "customer_id": 42,
            "invoice_num": "1338",
            "invoice_date": "2016-01-22",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 326,
            "customer_id": 42,
            "invoice_num": "1082",
            "invoice_date": "2015-06-23",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 327,
            "customer_id": 42,
            "invoice_num": "1331",
            "invoice_date": "2015-08-04",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 328,
            "customer_id": 42,
            "invoice_num": "1151",
            "invoice_date": "2016-12-18",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 329,
            "customer_id": 42,
            "invoice_num": "1352",
            "invoice_date": "2015-02-08",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 330,
            "customer_id": 42,
            "invoice_num": "1368",
            "invoice_date": "2015-04-01",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 331,
            "customer_id": 18,
            "invoice_num": "1350",
            "invoice_date": "2015-08-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 332,
            "customer_id": 18,
            "invoice_num": "1284",
            "invoice_date": "2015-01-09",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 333,
            "customer_id": 18,
            "invoice_num": "1194",
            "invoice_date": "2015-07-03",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 334,
            "customer_id": 18,
            "invoice_num": "1323",
            "invoice_date": "2016-05-31",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 335,
            "customer_id": 18,
            "invoice_num": "1396",
            "invoice_date": "2016-05-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 336,
            "customer_id": 18,
            "invoice_num": "1142",
            "invoice_date": "2015-08-27",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 337,
            "customer_id": 18,
            "invoice_num": "1306",
            "invoice_date": "2015-05-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 338,
            "customer_id": 18,
            "invoice_num": "1301",
            "invoice_date": "2015-08-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 339,
            "customer_id": 18,
            "invoice_num": "1317",
            "invoice_date": "2016-07-17",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 340,
            "customer_id": 17,
            "invoice_num": "1373",
            "invoice_date": "2017-01-21",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 341,
            "customer_id": 17,
            "invoice_num": "1125",
            "invoice_date": "2015-04-15",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 342,
            "customer_id": 17,
            "invoice_num": "1042",
            "invoice_date": "2016-03-11",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 343,
            "customer_id": 17,
            "invoice_num": "1307",
            "invoice_date": "2015-03-18",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 344,
            "customer_id": 17,
            "invoice_num": "1067",
            "invoice_date": "2016-03-11",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 345,
            "customer_id": 17,
            "invoice_num": "1223",
            "invoice_date": "2016-08-28",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 346,
            "customer_id": 17,
            "invoice_num": "1065",
            "invoice_date": "2015-01-30",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 347,
            "customer_id": 17,
            "invoice_num": "1054",
            "invoice_date": "2016-03-28",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 348,
            "customer_id": 21,
            "invoice_num": "1347",
            "invoice_date": "2016-07-19",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 349,
            "customer_id": 21,
            "invoice_num": "1178",
            "invoice_date": "2016-11-24",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 350,
            "customer_id": 21,
            "invoice_num": "1192",
            "invoice_date": "2015-03-03",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 351,
            "customer_id": 21,
            "invoice_num": "1056",
            "invoice_date": "2016-11-17",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 352,
            "customer_id": 21,
            "invoice_num": "1147",
            "invoice_date": "2015-09-09",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 353,
            "customer_id": 21,
            "invoice_num": "1374",
            "invoice_date": "2015-02-28",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 354,
            "customer_id": 48,
            "invoice_num": "1140",
            "invoice_date": "2016-05-28",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 355,
            "customer_id": 48,
            "invoice_num": "1231",
            "invoice_date": "2017-02-01",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 356,
            "customer_id": 48,
            "invoice_num": "1363",
            "invoice_date": "2016-05-24",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 357,
            "customer_id": 48,
            "invoice_num": "1244",
            "invoice_date": "2017-01-17",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 358,
            "customer_id": 48,
            "invoice_num": "1253",
            "invoice_date": "2016-05-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 359,
            "customer_id": 48,
            "invoice_num": "1170",
            "invoice_date": "2015-01-13",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 360,
            "customer_id": 48,
            "invoice_num": "1241",
            "invoice_date": "2016-05-28",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 361,
            "customer_id": 48,
            "invoice_num": "1327",
            "invoice_date": "2016-07-31",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 362,
            "customer_id": 42,
            "invoice_num": "1034",
            "invoice_date": "2017-10-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 363,
            "customer_id": 50,
            "invoice_num": "1021",
            "invoice_date": "2017-10-26",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 364,
            "customer_id": 47,
            "invoice_num": "1035",
            "invoice_date": "2017-12-11",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 365,
            "customer_id": 38,
            "invoice_num": "1049",
            "invoice_date": "2017-12-22",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 366,
            "customer_id": 47,
            "invoice_num": "1030",
            "invoice_date": "2017-04-16",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 367,
            "customer_id": 50,
            "invoice_num": "1039",
            "invoice_date": "2017-08-17",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 368,
            "customer_id": 44,
            "invoice_num": "1101",
            "invoice_date": "2015-03-03",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 369,
            "customer_id": 44,
            "invoice_num": "1400",
            "invoice_date": "2015-08-24",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 370,
            "customer_id": 44,
            "invoice_num": "1071",
            "invoice_date": "2015-01-13",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 371,
            "customer_id": 44,
            "invoice_num": "1360",
            "invoice_date": "2015-04-04",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 372,
            "customer_id": 44,
            "invoice_num": "1354",
            "invoice_date": "2015-07-01",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 373,
            "customer_id": 44,
            "invoice_num": "1123",
            "invoice_date": "2016-01-31",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 374,
            "customer_id": 44,
            "invoice_num": "1174",
            "invoice_date": "2015-05-18",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 375,
            "customer_id": 44,
            "invoice_num": "1003",
            "invoice_date": "2016-05-23",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 376,
            "customer_id": 44,
            "invoice_num": "1007",
            "invoice_date": "2016-07-13",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 377,
            "customer_id": 2,
            "invoice_num": "1033",
            "invoice_date": "2015-02-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 378,
            "customer_id": 2,
            "invoice_num": "1168",
            "invoice_date": "2016-07-23",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 379,
            "customer_id": 2,
            "invoice_num": "1141",
            "invoice_date": "2016-05-22",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 380,
            "customer_id": 2,
            "invoice_num": "1265",
            "invoice_date": "2017-02-26",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 381,
            "customer_id": 2,
            "invoice_num": "1308",
            "invoice_date": "2016-04-25",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 382,
            "customer_id": 2,
            "invoice_num": "1384",
            "invoice_date": "2015-08-08",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 383,
            "customer_id": 2,
            "invoice_num": "1158",
            "invoice_date": "2015-08-09",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 384,
            "customer_id": 25,
            "invoice_num": "1348",
            "invoice_date": "2015-11-19",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 385,
            "customer_id": 25,
            "invoice_num": "1341",
            "invoice_date": "2015-12-03",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 386,
            "customer_id": 25,
            "invoice_num": "1364",
            "invoice_date": "2015-03-20",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 387,
            "customer_id": 25,
            "invoice_num": "1128",
            "invoice_date": "2016-07-18",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 388,
            "customer_id": 25,
            "invoice_num": "1126",
            "invoice_date": "2015-01-01",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 389,
            "customer_id": 25,
            "invoice_num": "1164",
            "invoice_date": "2015-07-15",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 390,
            "customer_id": 25,
            "invoice_num": "1166",
            "invoice_date": "2015-02-28",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 391,
            "customer_id": 25,
            "invoice_num": "1173",
            "invoice_date": "2015-02-28",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 392,
            "customer_id": 25,
            "invoice_num": "1369",
            "invoice_date": "2015-11-05",
            "payment_status": true,
            "self-closing": true
        },
        {
            "invoice_id": 393,
            "customer_id": 25,
            "invoice_num": "1313",
            "invoice_date": "2015-09-24",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 394,
            "customer_id": 8,
            "invoice_num": "1100",
            "invoice_date": "2016-11-03",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 395,
            "customer_id": 8,
            "invoice_num": "1362",
            "invoice_date": "2016-03-28",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 396,
            "customer_id": 8,
            "invoice_num": "1026",
            "invoice_date": "2015-01-11",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 397,
            "customer_id": 8,
            "invoice_num": "1157",
            "invoice_date": "2015-07-30",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 398,
            "customer_id": 8,
            "invoice_num": "1299",
            "invoice_date": "2016-12-28",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 399,
            "customer_id": 8,
            "invoice_num": "1281",
            "invoice_date": "2017-01-25",
            "payment_status": false,
            "self-closing": true
        },
        {
            "invoice_id": 400,
            "customer_id": 8,
            "invoice_num": "1222",
            "invoice_date": "2016-11-06",
            "payment_status": true,
            "self-closing": true
        }
    ]

    const sampleTimeZonecheck =[
        {
            "id": 1,
            "birthdate": "2016-05-05",
            "updated": "2017-10-04T20:24:00.000Z",
            "created": "2011-10-05T06:17:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 2,
            "birthdate": "2016-05-12",
            "updated": "2017-10-28T08:16:00.000Z",
            "created": "2016-02-24T00:52:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 3,
            "birthdate": "2016-02-03",
            "updated": "2017-11-10T06:06:00.000Z",
            "created": "2010-01-21T16:17:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 4,
            "birthdate": "2016-05-12",
            "updated": "2017-10-04T20:24:00.000Z",
            "created": "2011-10-05T06:23:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 5,
            "birthdate": "2016-05-07",
            "updated": "2017-10-08T20:11:00.000Z",
            "created": "2016-02-25T15:01:04.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 6,
            "birthdate": "2016-05-07",
            "updated": "2018-08-08T11:30:00.000Z",
            "created": "2016-02-25T15:01:38.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 7,
            "birthdate": "2016-05-07",
            "updated": "2017-09-15T18:34:56.000Z",
            "created": "2016-02-25T15:01:40.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 8,
            "birthdate": "2017-11-21",
            "updated": "2017-03-01T22:44:15.000Z",
            "created": "2017-03-02T00:53:24.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 9,
            "birthdate": "2017-12-26",
            "updated": "2017-07-28T08:49:35.000Z",
            "created": "2017-11-25T18:31:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 10,
            "birthdate": "2016-07-30",
            "updated": "2017-03-14T09:47:36.000Z",
            "created": "2017-11-07T05:40:45.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 11,
            "birthdate": "2016-10-08",
            "updated": "2016-09-27T17:03:25.000Z",
            "created": "2017-12-12T16:08:28.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 12,
            "birthdate": "2016-12-23",
            "updated": "2016-12-01T08:19:32.000Z",
            "created": "2016-03-30T23:49:50.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 13,
            "birthdate": "2016-12-07",
            "updated": "2017-02-03T09:53:08.000Z",
            "created": "2016-04-16T06:08:50.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 14,
            "birthdate": "2016-12-13",
            "updated": "2016-06-25T19:07:51.000Z",
            "created": "2017-07-11T19:26:09.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 15,
            "birthdate": "2017-10-14",
            "updated": "2017-01-08T13:29:44.000Z",
            "created": "2016-08-02T01:52:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 16,
            "birthdate": "2016-01-29",
            "updated": "2017-08-24T14:02:29.000Z",
            "created": "2016-11-13T22:08:28.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 17,
            "birthdate": "2016-10-30",
            "updated": "2017-11-28T18:19:04.000Z",
            "created": "2017-07-09T02:44:15.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 18,
            "birthdate": "2017-10-17",
            "updated": "2017-12-03T09:50:42.000Z",
            "created": "2016-03-15T17:05:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 19,
            "birthdate": "2016-06-16",
            "updated": "2017-05-06T06:19:58.000Z",
            "created": "2016-10-12T16:03:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 20,
            "birthdate": "2016-04-17",
            "updated": "2016-03-22T16:06:01.000Z",
            "created": "2017-12-04T01:36:05.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 21,
            "birthdate": "2017-01-18",
            "updated": "2016-11-18T18:09:41.000Z",
            "created": "2017-11-14T05:31:33.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 22,
            "birthdate": "2017-03-16",
            "updated": "2017-07-30T04:19:14.000Z",
            "created": "2016-07-23T03:28:38.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 23,
            "birthdate": "2016-03-21",
            "updated": "2017-11-27T06:11:26.000Z",
            "created": "2016-12-30T03:02:35.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 24,
            "birthdate": "2016-01-20",
            "updated": "2017-12-21T17:56:52.000Z",
            "created": "2016-07-21T05:50:44.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 25,
            "birthdate": "2017-07-29",
            "updated": "2017-09-26T12:45:57.000Z",
            "created": "2016-10-11T07:34:30.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 26,
            "birthdate": "2017-04-23",
            "updated": "2016-01-30T11:11:51.000Z",
            "created": "2016-12-19T16:39:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 27,
            "birthdate": "2016-01-18",
            "updated": "2016-05-04T09:12:52.000Z",
            "created": "2016-04-25T16:47:20.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 28,
            "birthdate": "2017-12-28",
            "updated": "2017-10-02T23:44:58.000Z",
            "created": "2017-12-28T12:37:04.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 29,
            "birthdate": "2016-07-02",
            "updated": "2016-07-18T14:38:17.000Z",
            "created": "2016-12-25T16:59:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 30,
            "birthdate": "2017-04-17",
            "updated": "2017-07-09T15:45:39.000Z",
            "created": "2016-06-08T02:33:09.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 31,
            "birthdate": "2017-06-09",
            "updated": "2017-03-06T08:37:02.000Z",
            "created": "2016-04-23T18:51:06.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 32,
            "birthdate": "2017-01-14",
            "updated": "2017-07-01T09:33:44.000Z",
            "created": "2016-12-22T10:35:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 33,
            "birthdate": "2016-01-02",
            "updated": "2016-05-19T08:01:39.000Z",
            "created": "2017-03-30T06:15:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 34,
            "birthdate": "2017-11-26",
            "updated": "2017-11-12T14:13:22.000Z",
            "created": "2016-09-17T01:41:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 35,
            "birthdate": "2017-06-27",
            "updated": "2016-05-10T07:55:32.000Z",
            "created": "2016-09-22T11:47:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 36,
            "birthdate": "2016-10-11",
            "updated": "2017-07-11T22:37:38.000Z",
            "created": "2016-06-21T06:33:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 37,
            "birthdate": "2016-10-21",
            "updated": "2017-12-24T07:11:11.000Z",
            "created": "2016-01-10T18:29:39.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 38,
            "birthdate": "2016-04-25",
            "updated": "2017-10-06T20:53:53.000Z",
            "created": "2016-06-14T19:57:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 39,
            "birthdate": "2016-06-09",
            "updated": "2016-06-18T16:03:53.000Z",
            "created": "2016-04-12T05:06:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 40,
            "birthdate": "2016-05-06",
            "updated": "2016-10-17T02:19:15.000Z",
            "created": "2016-04-19T19:53:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 41,
            "birthdate": "2016-12-06",
            "updated": "2017-02-28T08:07:23.000Z",
            "created": "2017-11-24T13:06:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 42,
            "birthdate": "2017-01-28",
            "updated": "2015-12-31T23:14:36.000Z",
            "created": "2017-07-26T06:00:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 43,
            "birthdate": "2016-09-13",
            "updated": "2017-03-01T23:37:07.000Z",
            "created": "2017-12-20T02:05:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 44,
            "birthdate": "2017-03-29",
            "updated": "2016-09-15T12:34:30.000Z",
            "created": "2016-07-13T14:05:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 45,
            "birthdate": "2016-07-06",
            "updated": "2017-12-16T14:30:17.000Z",
            "created": "2016-02-07T13:25:49.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 46,
            "birthdate": "2016-01-08",
            "updated": "2017-06-19T05:53:49.000Z",
            "created": "2017-02-05T11:51:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 47,
            "birthdate": "2017-09-10",
            "updated": "2017-07-02T02:39:40.000Z",
            "created": "2017-01-30T05:12:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 48,
            "birthdate": "2016-07-19",
            "updated": "2017-05-24T01:57:19.000Z",
            "created": "2016-08-18T11:30:34.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 49,
            "birthdate": "2016-09-29",
            "updated": "2016-11-30T23:43:33.000Z",
            "created": "2016-07-08T18:08:03.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 50,
            "birthdate": "2017-07-04",
            "updated": "2016-06-30T17:36:04.000Z",
            "created": "2016-09-04T22:14:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 51,
            "birthdate": "2017-04-14",
            "updated": "2016-11-21T18:34:56.000Z",
            "created": "2017-09-11T21:11:04.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 52,
            "birthdate": "2016-05-25",
            "updated": "2016-11-25T19:42:04.000Z",
            "created": "2016-04-21T20:26:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 53,
            "birthdate": "2017-09-03",
            "updated": "2017-04-30T02:11:57.000Z",
            "created": "2017-09-13T03:11:12.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 54,
            "birthdate": "2017-12-20",
            "updated": "2016-06-12T14:14:32.000Z",
            "created": "2017-01-27T09:09:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 55,
            "birthdate": "2016-01-20",
            "updated": "2016-08-23T22:29:01.000Z",
            "created": "2016-09-27T19:48:43.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 56,
            "birthdate": "2016-04-10",
            "updated": "2017-07-11T15:51:03.000Z",
            "created": "2016-04-02T11:42:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 57,
            "birthdate": "2017-11-02",
            "updated": "2017-02-27T08:54:16.000Z",
            "created": "2017-05-05T23:19:06.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 58,
            "birthdate": "2016-04-07",
            "updated": "2017-07-08T04:07:17.000Z",
            "created": "2017-07-11T09:45:46.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 59,
            "birthdate": "2016-02-05",
            "updated": "2016-01-27T14:28:28.000Z",
            "created": "2017-04-05T20:02:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 60,
            "birthdate": "2016-01-15",
            "updated": "2016-03-28T23:28:42.000Z",
            "created": "2016-11-04T16:41:34.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 61,
            "birthdate": "2017-02-13",
            "updated": "2016-08-25T08:29:26.000Z",
            "created": "2016-05-16T00:31:19.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 62,
            "birthdate": "2016-05-10",
            "updated": "2016-10-02T01:04:20.000Z",
            "created": "2017-06-19T17:44:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 63,
            "birthdate": "2016-06-12",
            "updated": "2016-10-23T17:11:42.000Z",
            "created": "2017-05-24T09:14:50.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 64,
            "birthdate": "2016-06-21",
            "updated": "2016-03-24T20:37:29.000Z",
            "created": "2017-04-19T13:46:41.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 65,
            "birthdate": "2016-03-11",
            "updated": "2016-01-22T07:17:16.000Z",
            "created": "2016-08-11T10:29:12.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 66,
            "birthdate": "2016-04-28",
            "updated": "2017-11-21T10:24:52.000Z",
            "created": "2017-05-18T15:41:58.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 67,
            "birthdate": "2017-06-07",
            "updated": "2016-10-11T15:22:49.000Z",
            "created": "2017-06-17T20:24:58.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 68,
            "birthdate": "2017-01-05",
            "updated": "2017-06-23T13:03:19.000Z",
            "created": "2016-01-06T15:26:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 69,
            "birthdate": "2016-12-26",
            "updated": "2017-03-18T13:41:42.000Z",
            "created": "2016-07-03T09:22:46.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 70,
            "birthdate": "2017-03-19",
            "updated": "2016-02-12T20:42:55.000Z",
            "created": "2016-11-03T22:30:38.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 71,
            "birthdate": "2017-06-09",
            "updated": "2016-11-15T20:24:58.000Z",
            "created": "2016-02-23T06:15:50.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 72,
            "birthdate": "2016-10-13",
            "updated": "2016-08-03T13:25:54.000Z",
            "created": "2017-05-05T23:41:14.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 73,
            "birthdate": "2016-06-25",
            "updated": "2017-12-20T02:59:18.000Z",
            "created": "2017-07-10T19:51:32.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 74,
            "birthdate": "2016-02-26",
            "updated": "2016-10-22T20:16:44.000Z",
            "created": "2017-11-02T00:23:12.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 75,
            "birthdate": "2016-12-20",
            "updated": "2017-01-03T14:16:02.000Z",
            "created": "2017-07-28T10:10:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 76,
            "birthdate": "2016-08-24",
            "updated": "2017-10-03T04:11:14.000Z",
            "created": "2017-11-06T16:06:35.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 77,
            "birthdate": "2017-12-28",
            "updated": "2017-06-11T17:10:12.000Z",
            "created": "2017-11-08T12:22:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 78,
            "birthdate": "2016-04-01",
            "updated": "2017-03-17T08:59:18.000Z",
            "created": "2017-04-12T13:09:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 79,
            "birthdate": "2017-02-04",
            "updated": "2017-09-06T22:28:14.000Z",
            "created": "2017-12-17T01:51:52.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 80,
            "birthdate": "2016-04-10",
            "updated": "2016-01-08T02:42:42.000Z",
            "created": "2016-06-19T14:49:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 81,
            "birthdate": "2017-07-13",
            "updated": "2017-03-18T10:43:01.000Z",
            "created": "2016-02-23T17:49:03.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 82,
            "birthdate": "2017-03-13",
            "updated": "2016-01-28T11:53:23.000Z",
            "created": "2017-10-20T00:33:32.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 83,
            "birthdate": "2016-02-03",
            "updated": "2017-01-12T22:42:44.000Z",
            "created": "2016-08-01T20:37:15.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 84,
            "birthdate": "2016-04-22",
            "updated": "2016-05-06T16:58:13.000Z",
            "created": "2017-12-19T22:43:40.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 85,
            "birthdate": "2016-02-04",
            "updated": "2017-09-16T21:39:06.000Z",
            "created": "2017-11-05T01:04:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 86,
            "birthdate": "2016-03-07",
            "updated": "2017-01-27T03:03:43.000Z",
            "created": "2016-02-29T12:20:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 87,
            "birthdate": "2017-10-15",
            "updated": "2017-10-16T14:25:15.000Z",
            "created": "2017-02-08T00:20:14.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 88,
            "birthdate": "2016-08-12",
            "updated": "2016-11-17T22:42:19.000Z",
            "created": "2016-01-31T04:27:58.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 89,
            "birthdate": "2017-10-08",
            "updated": "2016-02-19T00:18:54.000Z",
            "created": "2017-09-16T13:33:18.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 90,
            "birthdate": "2016-07-19",
            "updated": "2016-08-14T07:16:47.000Z",
            "created": "2017-04-03T18:44:56.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 91,
            "birthdate": "2016-02-02",
            "updated": "2016-09-05T07:18:09.000Z",
            "created": "2017-05-06T02:50:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 92,
            "birthdate": "2017-06-01",
            "updated": "2016-04-03T01:47:16.000Z",
            "created": "2016-07-13T16:23:38.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 93,
            "birthdate": "2017-01-03",
            "updated": "2016-05-07T13:09:47.000Z",
            "created": "2016-11-19T21:08:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 94,
            "birthdate": "2016-04-15",
            "updated": "2016-01-22T12:54:04.000Z",
            "created": "2016-09-30T06:26:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 95,
            "birthdate": "2016-01-28",
            "updated": "2016-11-05T02:38:08.000Z",
            "created": "2017-01-12T04:41:39.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 96,
            "birthdate": "2017-10-30",
            "updated": "2016-05-24T09:15:44.000Z",
            "created": "2017-10-30T03:29:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 97,
            "birthdate": "2017-01-30",
            "updated": "2017-02-02T19:05:24.000Z",
            "created": "2017-03-18T08:23:11.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 98,
            "birthdate": "2016-03-19",
            "updated": "2016-05-22T09:00:39.000Z",
            "created": "2016-02-14T14:03:40.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 99,
            "birthdate": "2017-04-29",
            "updated": "2017-05-20T02:53:22.000Z",
            "created": "2016-08-20T23:00:11.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 100,
            "birthdate": "2016-02-20",
            "updated": "2017-12-20T21:03:58.000Z",
            "created": "2016-06-17T00:03:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 101,
            "birthdate": "2017-03-27",
            "updated": "2016-11-19T14:02:09.000Z",
            "created": "2017-11-09T01:33:30.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 102,
            "birthdate": "2016-11-04",
            "updated": "2016-08-30T19:27:34.000Z",
            "created": "2017-03-02T15:21:34.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 103,
            "birthdate": "2017-01-31",
            "updated": "2017-11-01T18:12:28.000Z",
            "created": "2017-05-30T08:59:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 104,
            "birthdate": "2017-09-29",
            "updated": "2017-05-30T01:56:20.000Z",
            "created": "2017-12-21T20:14:05.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 105,
            "birthdate": "2017-05-23",
            "updated": "2016-07-26T03:01:31.000Z",
            "created": "2017-01-01T00:29:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 106,
            "birthdate": "2016-02-03",
            "updated": "2016-07-26T21:14:54.000Z",
            "created": "2017-03-18T08:01:43.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 107,
            "birthdate": "2017-10-31",
            "updated": "2016-05-25T06:13:03.000Z",
            "created": "2017-12-12T17:43:58.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 108,
            "birthdate": "2017-07-25",
            "updated": "2016-09-25T17:25:20.000Z",
            "created": "2016-02-27T09:36:19.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 109,
            "birthdate": "2016-07-10",
            "updated": "2017-02-05T17:34:10.000Z",
            "created": "2016-08-16T17:07:46.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 110,
            "birthdate": "2017-02-06",
            "updated": "2016-07-23T13:00:15.000Z",
            "created": "2016-11-14T09:03:07.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 111,
            "birthdate": "2017-06-30",
            "updated": "2017-09-28T20:42:43.000Z",
            "created": "2017-03-12T18:40:03.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 112,
            "birthdate": "2016-10-03",
            "updated": "2017-04-10T22:25:36.000Z",
            "created": "2016-04-16T05:47:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 113,
            "birthdate": "2016-09-07",
            "updated": "2016-10-01T02:01:17.000Z",
            "created": "2017-04-10T22:22:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 114,
            "birthdate": "2017-12-11",
            "updated": "2016-08-18T22:32:20.000Z",
            "created": "2017-01-06T13:20:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 115,
            "birthdate": "2016-07-04",
            "updated": "2017-06-19T15:51:21.000Z",
            "created": "2016-10-04T06:25:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 116,
            "birthdate": "2017-04-06",
            "updated": "2017-11-09T00:22:37.000Z",
            "created": "2016-12-22T17:54:18.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 117,
            "birthdate": "2016-02-04",
            "updated": "2017-06-16T19:37:42.000Z",
            "created": "2017-03-13T15:51:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 118,
            "birthdate": "2017-04-16",
            "updated": "2016-10-10T06:13:21.000Z",
            "created": "2016-12-11T17:21:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 119,
            "birthdate": "2016-12-26",
            "updated": "2017-12-17T14:48:42.000Z",
            "created": "2017-11-22T01:42:04.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 120,
            "birthdate": "2016-03-06",
            "updated": "2017-05-17T05:09:29.000Z",
            "created": "2017-12-19T14:17:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 121,
            "birthdate": "2017-07-28",
            "updated": "2016-08-15T21:00:50.000Z",
            "created": "2017-11-11T02:27:28.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 122,
            "birthdate": "2016-02-28",
            "updated": "2017-10-12T19:14:02.000Z",
            "created": "2016-05-02T07:55:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 123,
            "birthdate": "2017-09-18",
            "updated": "2017-01-24T20:27:20.000Z",
            "created": "2017-01-02T18:59:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 124,
            "birthdate": "2017-04-02",
            "updated": "2016-03-19T17:34:50.000Z",
            "created": "2016-12-12T13:49:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 125,
            "birthdate": "2017-04-25",
            "updated": "2016-08-28T09:00:53.000Z",
            "created": "2017-06-08T12:19:01.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 126,
            "birthdate": "2017-10-29",
            "updated": "2017-02-06T19:44:11.000Z",
            "created": "2016-06-03T12:22:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 127,
            "birthdate": "2016-07-13",
            "updated": "2017-06-02T13:30:33.000Z",
            "created": "2016-02-24T16:52:07.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 128,
            "birthdate": "2017-12-14",
            "updated": "2017-09-15T07:06:19.000Z",
            "created": "2016-08-12T02:37:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 129,
            "birthdate": "2016-04-29",
            "updated": "2017-08-29T23:23:45.000Z",
            "created": "2017-04-08T06:40:33.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 130,
            "birthdate": "2016-12-31",
            "updated": "2017-10-12T11:43:38.000Z",
            "created": "2016-12-15T06:48:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 131,
            "birthdate": "2017-03-25",
            "updated": "2016-05-13T09:53:12.000Z",
            "created": "2016-08-19T06:45:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 132,
            "birthdate": "2017-02-15",
            "updated": "2017-06-05T09:18:52.000Z",
            "created": "2016-10-22T19:06:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 133,
            "birthdate": "2017-12-10",
            "updated": "2017-10-31T18:45:25.000Z",
            "created": "2016-12-09T02:42:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 134,
            "birthdate": "2017-12-17",
            "updated": "2016-09-19T15:21:34.000Z",
            "created": "2017-01-07T22:33:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 135,
            "birthdate": "2016-04-07",
            "updated": "2016-06-26T20:30:38.000Z",
            "created": "2017-12-04T19:33:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 136,
            "birthdate": "2017-04-28",
            "updated": "2016-03-04T11:06:35.000Z",
            "created": "2016-06-21T17:10:34.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 137,
            "birthdate": "2016-11-10",
            "updated": "2016-12-19T15:23:01.000Z",
            "created": "2017-08-27T12:52:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 138,
            "birthdate": "2016-06-16",
            "updated": "2016-06-14T15:50:14.000Z",
            "created": "2016-05-17T02:05:55.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 139,
            "birthdate": "2016-11-16",
            "updated": "2016-02-09T22:56:10.000Z",
            "created": "2016-06-17T22:09:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 140,
            "birthdate": "2016-11-14",
            "updated": "2017-10-16T13:07:43.000Z",
            "created": "2016-06-11T03:41:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 141,
            "birthdate": "2016-05-07",
            "updated": "2017-08-12T21:19:00.000Z",
            "created": "2016-12-18T01:04:58.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 142,
            "birthdate": "2016-03-22",
            "updated": "2017-02-15T06:33:28.000Z",
            "created": "2017-01-09T16:05:18.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 143,
            "birthdate": "2017-02-03",
            "updated": "2017-02-05T06:41:37.000Z",
            "created": "2017-03-31T10:27:30.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 144,
            "birthdate": "2017-06-14",
            "updated": "2016-03-21T13:29:56.000Z",
            "created": "2017-01-23T13:15:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 145,
            "birthdate": "2016-06-15",
            "updated": "2017-03-20T18:23:17.000Z",
            "created": "2017-07-08T13:11:58.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 146,
            "birthdate": "2016-11-09",
            "updated": "2017-12-13T05:55:29.000Z",
            "created": "2016-07-29T01:18:51.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 147,
            "birthdate": "2017-01-05",
            "updated": "2017-08-29T13:51:34.000Z",
            "created": "2017-03-19T07:04:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 148,
            "birthdate": "2017-05-24",
            "updated": "2017-11-16T14:51:09.000Z",
            "created": "2017-11-27T10:23:39.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 149,
            "birthdate": "2016-11-23",
            "updated": "2016-01-07T03:09:33.000Z",
            "created": "2017-05-25T10:37:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 150,
            "birthdate": "2017-11-22",
            "updated": "2016-03-10T02:41:13.000Z",
            "created": "2016-02-01T01:24:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 151,
            "birthdate": "2016-06-17",
            "updated": "2017-07-28T07:46:33.000Z",
            "created": "2017-12-20T06:42:06.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 152,
            "birthdate": "2017-12-10",
            "updated": "2016-03-26T21:14:43.000Z",
            "created": "2016-03-12T23:44:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 153,
            "birthdate": "2017-08-24",
            "updated": "2016-06-18T03:38:27.000Z",
            "created": "2017-08-29T15:10:14.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 154,
            "birthdate": "2016-10-22",
            "updated": "2016-12-02T02:06:33.000Z",
            "created": "2017-11-01T19:14:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 155,
            "birthdate": "2017-01-07",
            "updated": "2017-10-29T19:54:44.000Z",
            "created": "2017-07-14T18:50:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 156,
            "birthdate": "2016-07-19",
            "updated": "2017-07-10T03:40:22.000Z",
            "created": "2016-06-28T03:28:04.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 157,
            "birthdate": "2017-11-13",
            "updated": "2016-04-19T15:24:16.000Z",
            "created": "2017-10-03T06:33:33.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 158,
            "birthdate": "2017-07-31",
            "updated": "2017-08-06T19:32:27.000Z",
            "created": "2017-12-08T04:42:03.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 159,
            "birthdate": "2016-12-24",
            "updated": "2016-05-22T12:31:42.000Z",
            "created": "2016-02-14T13:11:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 160,
            "birthdate": "2017-10-07",
            "updated": "2017-05-10T19:32:25.000Z",
            "created": "2016-07-17T08:04:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 161,
            "birthdate": "2016-02-17",
            "updated": "2017-08-26T20:32:00.000Z",
            "created": "2017-08-18T12:46:34.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 162,
            "birthdate": "2017-06-27",
            "updated": "2016-04-12T12:40:31.000Z",
            "created": "2017-02-07T02:11:43.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 163,
            "birthdate": "2017-07-18",
            "updated": "2017-05-21T14:21:25.000Z",
            "created": "2017-08-06T07:18:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 164,
            "birthdate": "2017-01-07",
            "updated": "2017-03-13T13:22:26.000Z",
            "created": "2017-05-06T04:23:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 165,
            "birthdate": "2016-07-09",
            "updated": "2017-01-24T16:31:19.000Z",
            "created": "2017-06-08T00:00:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 166,
            "birthdate": "2017-01-06",
            "updated": "2016-08-05T22:43:45.000Z",
            "created": "2017-01-03T09:44:07.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 167,
            "birthdate": "2016-10-12",
            "updated": "2017-12-17T21:32:16.000Z",
            "created": "2017-04-06T10:08:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 168,
            "birthdate": "2017-04-23",
            "updated": "2016-03-15T22:39:18.000Z",
            "created": "2017-05-25T18:20:03.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 169,
            "birthdate": "2017-07-26",
            "updated": "2017-04-27T20:39:53.000Z",
            "created": "2017-02-14T14:15:34.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 170,
            "birthdate": "2017-09-06",
            "updated": "2016-10-12T08:37:53.000Z",
            "created": "2016-12-18T01:22:05.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 171,
            "birthdate": "2017-02-02",
            "updated": "2016-02-02T16:15:36.000Z",
            "created": "2017-03-02T17:43:52.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 172,
            "birthdate": "2016-12-27",
            "updated": "2016-10-28T17:56:05.000Z",
            "created": "2016-06-05T08:09:04.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 173,
            "birthdate": "2016-10-14",
            "updated": "2017-03-19T19:14:02.000Z",
            "created": "2017-07-18T09:41:32.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 174,
            "birthdate": "2016-10-16",
            "updated": "2016-06-26T04:09:44.000Z",
            "created": "2016-09-29T06:58:30.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 175,
            "birthdate": "2017-06-18",
            "updated": "2016-05-25T01:21:14.000Z",
            "created": "2017-04-17T05:39:35.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 176,
            "birthdate": "2016-05-11",
            "updated": "2016-09-24T15:00:03.000Z",
            "created": "2016-07-24T12:46:03.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 177,
            "birthdate": "2017-03-16",
            "updated": "2016-07-02T22:28:45.000Z",
            "created": "2017-11-16T19:05:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 178,
            "birthdate": "2016-04-12",
            "updated": "2017-04-18T00:04:55.000Z",
            "created": "2017-03-24T23:30:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 179,
            "birthdate": "2017-07-03",
            "updated": "2017-05-26T18:05:19.000Z",
            "created": "2016-12-06T01:59:07.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 180,
            "birthdate": "2016-07-29",
            "updated": "2017-12-22T23:03:26.000Z",
            "created": "2017-04-19T11:00:01.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 181,
            "birthdate": "2016-03-22",
            "updated": "2016-04-27T10:40:47.000Z",
            "created": "2016-11-30T09:58:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 182,
            "birthdate": "2017-09-02",
            "updated": "2016-03-12T19:37:48.000Z",
            "created": "2017-08-06T10:28:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 183,
            "birthdate": "2016-02-14",
            "updated": "2017-09-08T15:27:36.000Z",
            "created": "2016-12-27T21:22:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 184,
            "birthdate": "2017-03-04",
            "updated": "2017-09-06T21:05:01.000Z",
            "created": "2017-09-20T08:41:47.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 185,
            "birthdate": "2016-03-06",
            "updated": "2017-07-05T11:40:31.000Z",
            "created": "2017-06-20T13:23:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 186,
            "birthdate": "2016-10-06",
            "updated": "2016-06-09T23:49:50.000Z",
            "created": "2017-09-20T20:07:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 187,
            "birthdate": "2016-11-07",
            "updated": "2016-07-14T22:55:54.000Z",
            "created": "2016-08-07T03:12:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 188,
            "birthdate": "2016-06-06",
            "updated": "2016-03-30T09:03:06.000Z",
            "created": "2016-12-28T15:50:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 189,
            "birthdate": "2017-07-08",
            "updated": "2017-02-11T10:28:28.000Z",
            "created": "2017-07-31T08:51:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 190,
            "birthdate": "2016-07-27",
            "updated": "2017-08-09T09:16:19.000Z",
            "created": "2017-10-08T05:53:40.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 191,
            "birthdate": "2017-10-03",
            "updated": "2016-11-27T04:16:37.000Z",
            "created": "2017-12-26T04:06:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 192,
            "birthdate": "2016-08-06",
            "updated": "2017-04-27T16:00:01.000Z",
            "created": "2017-06-19T09:10:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 193,
            "birthdate": "2016-03-01",
            "updated": "2017-02-06T18:58:46.000Z",
            "created": "2017-03-30T16:42:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 194,
            "birthdate": "2017-04-09",
            "updated": "2017-07-02T12:00:23.000Z",
            "created": "2016-11-27T06:05:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 195,
            "birthdate": "2016-08-21",
            "updated": "2016-01-24T20:00:48.000Z",
            "created": "2017-07-10T16:42:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 196,
            "birthdate": "2016-08-04",
            "updated": "2016-09-04T02:43:34.000Z",
            "created": "2017-10-23T22:27:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 197,
            "birthdate": "2016-01-07",
            "updated": "2017-08-19T21:18:54.000Z",
            "created": "2016-10-09T17:43:37.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 198,
            "birthdate": "2017-04-25",
            "updated": "2017-01-10T04:53:51.000Z",
            "created": "2016-08-23T18:26:07.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 199,
            "birthdate": "2017-11-24",
            "updated": "2016-03-04T23:38:47.000Z",
            "created": "2017-06-18T06:05:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 200,
            "birthdate": "2017-09-22",
            "updated": "2016-03-10T08:31:41.000Z",
            "created": "2016-06-11T10:45:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 201,
            "birthdate": "2017-01-30",
            "updated": "2017-12-09T13:13:38.000Z",
            "created": "2017-05-04T22:44:33.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 202,
            "birthdate": "2016-06-19",
            "updated": "2017-04-09T07:48:28.000Z",
            "created": "2017-06-25T11:47:45.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 203,
            "birthdate": "2016-11-14",
            "updated": "2016-07-20T05:08:19.000Z",
            "created": "2016-09-27T18:17:01.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 204,
            "birthdate": "2016-06-16",
            "updated": "2016-04-12T23:55:46.000Z",
            "created": "2017-10-26T01:21:41.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 205,
            "birthdate": "2017-12-06",
            "updated": "2016-03-31T10:48:29.000Z",
            "created": "2017-08-17T05:58:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 206,
            "birthdate": "2016-01-30",
            "updated": "2016-09-18T11:03:13.000Z",
            "created": "2016-01-05T06:26:44.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 207,
            "birthdate": "2017-08-28",
            "updated": "2016-09-16T10:51:52.000Z",
            "created": "2017-02-07T21:39:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 208,
            "birthdate": "2017-05-25",
            "updated": "2016-12-01T19:36:44.000Z",
            "created": "2016-09-19T08:27:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 209,
            "birthdate": "2017-12-29",
            "updated": "2016-11-07T22:08:12.000Z",
            "created": "2016-12-20T13:41:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 210,
            "birthdate": "2016-05-03",
            "updated": "2016-10-16T12:57:45.000Z",
            "created": "2016-09-05T16:43:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 211,
            "birthdate": "2016-11-08",
            "updated": "2017-12-10T18:17:59.000Z",
            "created": "2017-10-17T05:47:38.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 212,
            "birthdate": "2016-05-25",
            "updated": "2016-03-29T04:44:08.000Z",
            "created": "2017-02-17T22:57:27.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 213,
            "birthdate": "2017-10-13",
            "updated": "2016-03-19T07:16:05.000Z",
            "created": "2017-03-08T10:16:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 214,
            "birthdate": "2017-05-30",
            "updated": "2016-01-08T15:32:55.000Z",
            "created": "2017-09-30T00:50:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 215,
            "birthdate": "2017-04-16",
            "updated": "2016-10-25T21:54:36.000Z",
            "created": "2016-04-24T04:26:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 216,
            "birthdate": "2016-10-10",
            "updated": "2017-09-28T07:20:37.000Z",
            "created": "2017-10-20T04:12:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 217,
            "birthdate": "2016-02-08",
            "updated": "2016-01-16T15:55:46.000Z",
            "created": "2016-06-23T04:41:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 218,
            "birthdate": "2016-08-16",
            "updated": "2017-05-06T11:16:15.000Z",
            "created": "2016-04-25T06:07:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 219,
            "birthdate": "2016-10-26",
            "updated": "2016-03-29T04:31:22.000Z",
            "created": "2017-05-09T02:55:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 220,
            "birthdate": "2016-02-07",
            "updated": "2016-10-15T04:53:23.000Z",
            "created": "2016-01-07T03:44:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 221,
            "birthdate": "2016-08-10",
            "updated": "2017-09-15T17:06:18.000Z",
            "created": "2017-04-24T15:34:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 222,
            "birthdate": "2017-05-02",
            "updated": "2017-08-01T21:08:12.000Z",
            "created": "2016-08-29T10:00:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 223,
            "birthdate": "2017-07-21",
            "updated": "2016-12-15T02:26:58.000Z",
            "created": "2016-10-14T20:21:45.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 224,
            "birthdate": "2017-11-27",
            "updated": "2016-04-18T01:04:07.000Z",
            "created": "2016-12-06T04:48:51.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 225,
            "birthdate": "2016-12-02",
            "updated": "2017-05-10T22:26:36.000Z",
            "created": "2016-07-04T17:01:24.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 226,
            "birthdate": "2017-10-20",
            "updated": "2016-02-10T01:49:43.000Z",
            "created": "2017-07-09T12:45:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 227,
            "birthdate": "2016-03-06",
            "updated": "2016-11-22T04:41:40.000Z",
            "created": "2016-06-30T04:20:56.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 228,
            "birthdate": "2016-08-25",
            "updated": "2017-11-17T18:50:27.000Z",
            "created": "2017-05-13T17:46:52.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 229,
            "birthdate": "2016-04-14",
            "updated": "2017-05-12T07:58:07.000Z",
            "created": "2016-03-21T16:09:04.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 230,
            "birthdate": "2016-11-01",
            "updated": "2017-10-22T11:17:11.000Z",
            "created": "2017-02-03T12:11:35.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 231,
            "birthdate": "2017-10-31",
            "updated": "2017-09-09T19:11:26.000Z",
            "created": "2016-11-17T20:54:11.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 232,
            "birthdate": "2017-10-07",
            "updated": "2016-03-21T19:38:41.000Z",
            "created": "2017-03-11T00:37:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 233,
            "birthdate": "2017-10-05",
            "updated": "2016-07-20T02:15:33.000Z",
            "created": "2017-09-19T23:23:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 234,
            "birthdate": "2017-07-15",
            "updated": "2017-03-22T22:05:52.000Z",
            "created": "2017-05-02T11:42:15.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 235,
            "birthdate": "2016-06-01",
            "updated": "2017-06-24T21:14:08.000Z",
            "created": "2016-07-26T21:41:47.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 236,
            "birthdate": "2017-04-02",
            "updated": "2016-12-20T21:25:35.000Z",
            "created": "2017-02-16T19:43:15.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 237,
            "birthdate": "2016-11-07",
            "updated": "2016-12-03T04:54:25.000Z",
            "created": "2017-11-26T05:20:11.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 238,
            "birthdate": "2017-10-19",
            "updated": "2017-02-06T15:58:23.000Z",
            "created": "2017-10-31T20:49:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 239,
            "birthdate": "2016-09-18",
            "updated": "2016-10-29T18:07:52.000Z",
            "created": "2017-08-26T04:07:37.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 240,
            "birthdate": "2017-09-27",
            "updated": "2017-11-23T18:17:42.000Z",
            "created": "2016-03-05T07:48:50.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 241,
            "birthdate": "2016-12-10",
            "updated": "2017-10-08T20:46:32.000Z",
            "created": "2016-05-28T04:47:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 242,
            "birthdate": "2017-09-21",
            "updated": "2017-04-28T15:34:35.000Z",
            "created": "2017-04-09T07:14:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 243,
            "birthdate": "2017-06-10",
            "updated": "2016-04-01T07:26:29.000Z",
            "created": "2016-04-23T17:37:05.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 244,
            "birthdate": "2016-07-04",
            "updated": "2016-04-14T03:49:27.000Z",
            "created": "2017-10-08T03:37:44.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 245,
            "birthdate": "2016-07-14",
            "updated": "2016-09-16T02:31:31.000Z",
            "created": "2017-07-03T12:07:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 246,
            "birthdate": "2017-07-16",
            "updated": "2016-06-16T23:36:45.000Z",
            "created": "2016-05-21T23:52:05.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 247,
            "birthdate": "2016-04-07",
            "updated": "2017-02-14T19:15:53.000Z",
            "created": "2017-11-16T14:02:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 248,
            "birthdate": "2016-09-06",
            "updated": "2016-09-30T19:33:32.000Z",
            "created": "2016-05-26T20:00:51.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 249,
            "birthdate": "2017-04-03",
            "updated": "2017-07-21T01:19:42.000Z",
            "created": "2017-11-10T01:13:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 250,
            "birthdate": "2016-07-12",
            "updated": "2017-05-02T11:25:27.000Z",
            "created": "2016-10-20T13:03:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 251,
            "birthdate": "2017-09-25",
            "updated": "2017-12-19T20:59:24.000Z",
            "created": "2016-10-05T19:18:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 252,
            "birthdate": "2016-11-04",
            "updated": "2016-10-20T23:41:34.000Z",
            "created": "2016-06-06T02:32:33.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 253,
            "birthdate": "2017-03-02",
            "updated": "2016-11-07T15:26:52.000Z",
            "created": "2017-12-17T02:55:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 254,
            "birthdate": "2016-10-02",
            "updated": "2016-05-25T17:35:12.000Z",
            "created": "2016-10-07T08:44:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 255,
            "birthdate": "2017-04-20",
            "updated": "2016-06-18T12:05:55.000Z",
            "created": "2017-04-04T11:34:40.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 256,
            "birthdate": "2017-04-05",
            "updated": "2017-07-25T18:38:25.000Z",
            "created": "2016-03-24T21:23:33.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 257,
            "birthdate": "2017-12-04",
            "updated": "2016-06-06T03:39:11.000Z",
            "created": "2017-11-09T01:33:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 258,
            "birthdate": "2017-11-05",
            "updated": "2017-02-22T15:04:32.000Z",
            "created": "2016-05-02T18:34:01.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 259,
            "birthdate": "2016-04-09",
            "updated": "2017-10-22T23:14:21.000Z",
            "created": "2016-11-18T18:57:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 260,
            "birthdate": "2017-03-11",
            "updated": "2016-12-23T14:48:58.000Z",
            "created": "2017-10-01T22:43:39.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 261,
            "birthdate": "2017-01-17",
            "updated": "2017-09-06T06:31:23.000Z",
            "created": "2017-07-14T19:50:55.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 262,
            "birthdate": "2017-06-20",
            "updated": "2017-10-25T08:15:21.000Z",
            "created": "2017-03-20T00:51:19.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 263,
            "birthdate": "2017-09-11",
            "updated": "2017-06-29T03:52:43.000Z",
            "created": "2016-04-22T20:00:19.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 264,
            "birthdate": "2016-10-08",
            "updated": "2017-06-18T23:31:10.000Z",
            "created": "2016-07-10T16:25:46.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 265,
            "birthdate": "2017-01-29",
            "updated": "2016-04-11T21:09:29.000Z",
            "created": "2017-05-03T22:20:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 266,
            "birthdate": "2016-07-08",
            "updated": "2016-11-09T09:44:12.000Z",
            "created": "2016-08-31T00:59:16.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 267,
            "birthdate": "2017-10-19",
            "updated": "2017-12-29T02:55:57.000Z",
            "created": "2017-09-05T08:36:49.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 268,
            "birthdate": "2016-12-21",
            "updated": "2016-04-05T02:43:50.000Z",
            "created": "2017-07-06T14:00:46.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 269,
            "birthdate": "2017-06-13",
            "updated": "2017-03-09T14:40:47.000Z",
            "created": "2016-12-21T03:12:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 270,
            "birthdate": "2016-04-05",
            "updated": "2017-12-25T17:59:40.000Z",
            "created": "2016-11-28T14:42:09.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 271,
            "birthdate": "2016-07-27",
            "updated": "2017-06-04T14:10:12.000Z",
            "created": "2016-09-11T09:52:52.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 272,
            "birthdate": "2017-08-02",
            "updated": "2016-02-17T16:30:16.000Z",
            "created": "2016-08-30T06:41:27.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 273,
            "birthdate": "2016-03-30",
            "updated": "2017-06-09T15:03:44.000Z",
            "created": "2017-04-30T15:20:33.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 274,
            "birthdate": "2017-02-05",
            "updated": "2016-12-27T13:21:12.000Z",
            "created": "2016-02-09T06:33:47.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 275,
            "birthdate": "2017-02-11",
            "updated": "2017-11-12T03:56:36.000Z",
            "created": "2016-05-17T02:28:50.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 276,
            "birthdate": "2017-05-07",
            "updated": "2016-09-20T13:38:30.000Z",
            "created": "2017-09-07T05:11:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 277,
            "birthdate": "2017-12-11",
            "updated": "2016-02-16T10:29:56.000Z",
            "created": "2016-11-04T01:08:35.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 278,
            "birthdate": "2017-07-22",
            "updated": "2016-06-21T01:09:22.000Z",
            "created": "2016-08-07T10:39:03.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 279,
            "birthdate": "2016-03-02",
            "updated": "2016-11-25T22:44:07.000Z",
            "created": "2017-04-26T13:41:07.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 280,
            "birthdate": "2016-01-17",
            "updated": "2017-07-21T13:52:37.000Z",
            "created": "2016-10-31T17:28:07.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 281,
            "birthdate": "2017-10-04",
            "updated": "2017-09-05T12:34:54.000Z",
            "created": "2017-05-15T10:13:55.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 282,
            "birthdate": "2016-11-22",
            "updated": "2017-08-04T10:50:56.000Z",
            "created": "2016-08-14T08:32:51.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 283,
            "birthdate": "2017-09-06",
            "updated": "2016-07-05T23:55:02.000Z",
            "created": "2017-03-25T22:38:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 284,
            "birthdate": "2016-05-04",
            "updated": "2016-07-26T09:07:36.000Z",
            "created": "2017-11-12T01:31:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 285,
            "birthdate": "2017-05-21",
            "updated": "2017-02-27T12:20:33.000Z",
            "created": "2017-05-18T14:10:16.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 286,
            "birthdate": "2017-03-27",
            "updated": "2017-05-14T12:34:46.000Z",
            "created": "2017-06-12T06:05:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 287,
            "birthdate": "2017-03-19",
            "updated": "2017-06-29T03:20:51.000Z",
            "created": "2017-01-21T05:34:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 288,
            "birthdate": "2016-07-16",
            "updated": "2016-05-01T00:52:49.000Z",
            "created": "2016-06-03T18:52:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 289,
            "birthdate": "2016-12-05",
            "updated": "2016-04-25T09:05:52.000Z",
            "created": "2016-08-26T20:57:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 290,
            "birthdate": "2017-08-08",
            "updated": "2016-11-01T22:12:28.000Z",
            "created": "2017-12-04T12:22:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 291,
            "birthdate": "2016-02-17",
            "updated": "2017-12-11T02:55:59.000Z",
            "created": "2016-12-07T10:32:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 292,
            "birthdate": "2017-06-06",
            "updated": "2016-06-21T03:12:02.000Z",
            "created": "2016-07-15T02:03:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 293,
            "birthdate": "2017-01-01",
            "updated": "2016-02-15T22:09:27.000Z",
            "created": "2017-03-26T15:32:47.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 294,
            "birthdate": "2017-03-06",
            "updated": "2017-05-16T04:53:39.000Z",
            "created": "2016-08-22T21:39:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 295,
            "birthdate": "2016-12-01",
            "updated": "2016-02-08T23:48:23.000Z",
            "created": "2016-05-27T08:58:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 296,
            "birthdate": "2017-04-14",
            "updated": "2017-12-15T06:16:30.000Z",
            "created": "2017-11-22T18:02:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 297,
            "birthdate": "2016-10-04",
            "updated": "2016-05-02T23:51:50.000Z",
            "created": "2016-04-05T04:29:28.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 298,
            "birthdate": "2016-12-19",
            "updated": "2017-10-31T17:38:21.000Z",
            "created": "2016-10-26T19:38:45.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 299,
            "birthdate": "2017-06-26",
            "updated": "2017-12-13T12:01:41.000Z",
            "created": "2016-08-28T14:26:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 300,
            "birthdate": "2017-09-25",
            "updated": "2017-07-09T23:03:20.000Z",
            "created": "2016-06-23T06:04:58.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 301,
            "birthdate": "2017-07-14",
            "updated": "2016-05-09T09:27:28.000Z",
            "created": "2017-08-04T18:45:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 302,
            "birthdate": "2017-12-22",
            "updated": "2017-10-23T06:26:02.000Z",
            "created": "2016-09-15T17:39:40.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 303,
            "birthdate": "2017-02-01",
            "updated": "2016-10-11T08:16:55.000Z",
            "created": "2016-07-13T02:32:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 304,
            "birthdate": "2016-07-04",
            "updated": "2017-05-17T12:55:51.000Z",
            "created": "2017-11-17T20:50:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 305,
            "birthdate": "2016-10-10",
            "updated": "2017-08-14T18:03:20.000Z",
            "created": "2016-08-04T05:47:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 306,
            "birthdate": "2017-07-04",
            "updated": "2017-03-28T10:55:49.000Z",
            "created": "2017-06-26T19:27:14.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 307,
            "birthdate": "2016-09-15",
            "updated": "2016-06-23T11:53:55.000Z",
            "created": "2017-09-13T19:39:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 308,
            "birthdate": "2017-06-28",
            "updated": "2017-07-17T05:15:27.000Z",
            "created": "2016-09-14T11:24:27.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 309,
            "birthdate": "2017-02-28",
            "updated": "2016-11-14T18:03:47.000Z",
            "created": "2017-06-25T02:51:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 310,
            "birthdate": "2017-12-24",
            "updated": "2017-01-25T18:02:02.000Z",
            "created": "2017-12-19T22:06:35.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 311,
            "birthdate": "2017-08-20",
            "updated": "2016-07-11T08:19:33.000Z",
            "created": "2016-08-03T21:30:45.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 312,
            "birthdate": "2016-02-21",
            "updated": "2016-03-16T19:37:17.000Z",
            "created": "2017-11-28T10:27:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 313,
            "birthdate": "2017-10-29",
            "updated": "2016-11-25T06:35:43.000Z",
            "created": "2016-06-27T13:53:46.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 314,
            "birthdate": "2016-08-04",
            "updated": "2017-02-06T15:56:03.000Z",
            "created": "2017-10-20T03:02:06.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 315,
            "birthdate": "2017-02-28",
            "updated": "2016-08-26T04:05:31.000Z",
            "created": "2016-08-20T23:02:02.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 316,
            "birthdate": "2017-05-20",
            "updated": "2017-04-10T10:16:08.000Z",
            "created": "2017-03-21T02:46:07.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 317,
            "birthdate": "2016-06-22",
            "updated": "2016-01-23T23:36:33.000Z",
            "created": "2017-12-29T23:27:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 318,
            "birthdate": "2016-11-10",
            "updated": "2016-05-09T17:19:13.000Z",
            "created": "2017-11-27T03:44:49.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 319,
            "birthdate": "2016-08-04",
            "updated": "2017-10-12T01:48:07.000Z",
            "created": "2017-05-16T05:30:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 320,
            "birthdate": "2016-01-20",
            "updated": "2017-06-09T01:53:53.000Z",
            "created": "2017-10-08T15:41:55.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 321,
            "birthdate": "2016-09-24",
            "updated": "2017-08-12T04:44:22.000Z",
            "created": "2017-01-04T13:50:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 322,
            "birthdate": "2016-10-30",
            "updated": "2017-07-13T20:36:20.000Z",
            "created": "2017-12-05T12:25:56.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 323,
            "birthdate": "2017-05-28",
            "updated": "2017-12-27T15:47:38.000Z",
            "created": "2017-06-03T14:13:56.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 324,
            "birthdate": "2017-03-07",
            "updated": "2016-10-18T14:35:20.000Z",
            "created": "2016-06-02T21:25:37.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 325,
            "birthdate": "2016-05-03",
            "updated": "2016-06-16T13:19:01.000Z",
            "created": "2016-05-04T05:48:19.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 326,
            "birthdate": "2016-07-10",
            "updated": "2017-08-01T08:07:28.000Z",
            "created": "2017-03-30T20:21:14.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 327,
            "birthdate": "2016-08-07",
            "updated": "2016-12-15T06:10:35.000Z",
            "created": "2017-05-13T10:12:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 328,
            "birthdate": "2016-12-14",
            "updated": "2016-04-01T06:37:16.000Z",
            "created": "2016-02-10T07:35:51.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 329,
            "birthdate": "2017-11-05",
            "updated": "2017-09-11T16:22:44.000Z",
            "created": "2017-04-24T04:29:52.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 330,
            "birthdate": "2016-09-04",
            "updated": "2017-06-22T14:02:37.000Z",
            "created": "2017-09-04T09:34:30.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 331,
            "birthdate": "2016-07-22",
            "updated": "2017-01-18T10:39:37.000Z",
            "created": "2017-03-03T20:23:12.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 332,
            "birthdate": "2016-03-16",
            "updated": "2017-12-13T22:35:34.000Z",
            "created": "2016-06-22T16:06:37.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 333,
            "birthdate": "2017-06-20",
            "updated": "2017-02-26T23:46:23.000Z",
            "created": "2016-02-14T16:25:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 334,
            "birthdate": "2017-10-16",
            "updated": "2016-08-30T15:20:57.000Z",
            "created": "2017-05-01T22:19:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 335,
            "birthdate": "2017-11-01",
            "updated": "2017-01-08T19:31:03.000Z",
            "created": "2016-09-06T13:14:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 336,
            "birthdate": "2017-06-01",
            "updated": "2017-01-19T21:38:14.000Z",
            "created": "2017-02-02T12:47:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 337,
            "birthdate": "2016-05-07",
            "updated": "2016-11-24T13:01:04.000Z",
            "created": "2016-09-12T13:36:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 338,
            "birthdate": "2017-02-08",
            "updated": "2016-09-07T05:22:25.000Z",
            "created": "2016-06-28T17:58:01.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 339,
            "birthdate": "2017-05-31",
            "updated": "2016-07-15T00:01:34.000Z",
            "created": "2017-09-11T04:39:15.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 340,
            "birthdate": "2017-03-05",
            "updated": "2016-03-22T19:15:26.000Z",
            "created": "2016-12-20T10:07:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 341,
            "birthdate": "2017-10-01",
            "updated": "2016-08-24T17:14:26.000Z",
            "created": "2017-08-09T01:16:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 342,
            "birthdate": "2016-09-07",
            "updated": "2016-11-01T22:00:40.000Z",
            "created": "2017-04-22T10:52:37.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 343,
            "birthdate": "2016-02-17",
            "updated": "2017-02-17T01:45:01.000Z",
            "created": "2017-05-26T00:12:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 344,
            "birthdate": "2017-05-05",
            "updated": "2016-08-23T08:49:45.000Z",
            "created": "2016-05-22T04:10:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 345,
            "birthdate": "2016-09-16",
            "updated": "2017-01-16T04:56:17.000Z",
            "created": "2016-09-19T16:30:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 346,
            "birthdate": "2017-03-22",
            "updated": "2016-06-16T09:48:33.000Z",
            "created": "2016-04-05T02:51:19.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 347,
            "birthdate": "2016-07-10",
            "updated": "2017-08-31T12:37:07.000Z",
            "created": "2016-04-03T10:37:38.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 348,
            "birthdate": "2016-11-26",
            "updated": "2016-10-17T13:34:29.000Z",
            "created": "2016-01-01T08:14:28.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 349,
            "birthdate": "2017-05-27",
            "updated": "2016-10-28T09:08:38.000Z",
            "created": "2017-12-21T16:15:06.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 350,
            "birthdate": "2017-02-01",
            "updated": "2017-04-02T01:09:04.000Z",
            "created": "2017-03-22T11:30:28.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 351,
            "birthdate": "2017-05-17",
            "updated": "2016-06-02T00:08:03.000Z",
            "created": "2017-07-18T15:19:03.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 352,
            "birthdate": "2016-05-01",
            "updated": "2017-03-22T13:58:28.000Z",
            "created": "2016-07-24T19:10:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 353,
            "birthdate": "2017-06-29",
            "updated": "2017-01-25T02:40:06.000Z",
            "created": "2016-09-18T21:36:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 354,
            "birthdate": "2016-10-07",
            "updated": "2016-05-19T14:02:41.000Z",
            "created": "2016-12-05T19:41:55.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 355,
            "birthdate": "2017-01-20",
            "updated": "2017-05-20T05:14:40.000Z",
            "created": "2017-03-16T06:40:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 356,
            "birthdate": "2017-11-05",
            "updated": "2017-08-11T11:59:41.000Z",
            "created": "2017-04-19T06:29:44.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 357,
            "birthdate": "2017-08-26",
            "updated": "2016-06-10T12:12:07.000Z",
            "created": "2017-10-15T01:32:35.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 358,
            "birthdate": "2017-03-28",
            "updated": "2017-06-09T17:37:09.000Z",
            "created": "2017-12-12T15:39:30.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 359,
            "birthdate": "2017-09-28",
            "updated": "2017-02-08T03:56:01.000Z",
            "created": "2016-06-18T14:23:16.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 360,
            "birthdate": "2016-07-18",
            "updated": "2016-11-08T03:42:48.000Z",
            "created": "2017-09-06T12:47:51.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 361,
            "birthdate": "2016-07-29",
            "updated": "2016-02-16T00:32:30.000Z",
            "created": "2017-10-30T14:54:06.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 362,
            "birthdate": "2017-02-24",
            "updated": "2016-12-07T12:55:47.000Z",
            "created": "2017-08-04T00:31:41.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 363,
            "birthdate": "2016-04-17",
            "updated": "2016-10-05T17:43:04.000Z",
            "created": "2017-07-31T11:26:34.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 364,
            "birthdate": "2016-01-31",
            "updated": "2016-08-26T00:10:30.000Z",
            "created": "2016-02-11T03:28:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 365,
            "birthdate": "2016-05-23",
            "updated": "2017-04-07T14:21:43.000Z",
            "created": "2017-05-24T17:57:47.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 366,
            "birthdate": "2016-09-08",
            "updated": "2016-09-27T22:53:08.000Z",
            "created": "2017-06-15T02:38:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 367,
            "birthdate": "2016-02-25",
            "updated": "2016-11-10T07:00:13.000Z",
            "created": "2017-12-29T20:49:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 368,
            "birthdate": "2017-12-18",
            "updated": "2017-12-26T08:49:51.000Z",
            "created": "2016-11-30T12:38:30.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 369,
            "birthdate": "2017-06-01",
            "updated": "2016-03-25T19:44:49.000Z",
            "created": "2017-10-05T14:02:15.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 370,
            "birthdate": "2017-08-15",
            "updated": "2017-11-07T06:22:29.000Z",
            "created": "2017-01-16T00:42:45.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 371,
            "birthdate": "2016-01-13",
            "updated": "2016-06-18T01:15:25.000Z",
            "created": "2016-04-19T14:04:27.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 372,
            "birthdate": "2016-08-10",
            "updated": "2017-05-15T09:05:44.000Z",
            "created": "2017-11-08T01:07:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 373,
            "birthdate": "2016-03-02",
            "updated": "2016-11-19T01:11:18.000Z",
            "created": "2016-09-22T07:50:18.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 374,
            "birthdate": "2016-03-04",
            "updated": "2017-11-28T10:59:55.000Z",
            "created": "2016-07-23T22:44:09.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 375,
            "birthdate": "2016-03-05",
            "updated": "2016-10-28T13:17:26.000Z",
            "created": "2016-02-26T21:42:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 376,
            "birthdate": "2016-12-18",
            "updated": "2017-09-08T16:39:28.000Z",
            "created": "2016-10-12T03:57:52.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 377,
            "birthdate": "2017-10-30",
            "updated": "2016-06-10T23:55:38.000Z",
            "created": "2016-02-21T15:27:16.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 378,
            "birthdate": "2017-08-07",
            "updated": "2016-11-04T12:04:38.000Z",
            "created": "2017-02-24T06:18:48.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 379,
            "birthdate": "2016-01-12",
            "updated": "2017-11-30T03:29:37.000Z",
            "created": "2016-04-17T06:08:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 380,
            "birthdate": "2016-03-22",
            "updated": "2017-07-30T18:31:55.000Z",
            "created": "2017-08-12T00:55:44.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 381,
            "birthdate": "2017-11-24",
            "updated": "2016-01-08T15:52:13.000Z",
            "created": "2016-09-02T20:18:45.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 382,
            "birthdate": "2017-06-12",
            "updated": "2016-07-04T09:34:00.000Z",
            "created": "2017-12-29T21:34:19.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 383,
            "birthdate": "2016-11-26",
            "updated": "2017-04-01T07:28:29.000Z",
            "created": "2016-12-10T16:16:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 384,
            "birthdate": "2017-05-13",
            "updated": "2016-08-11T08:03:45.000Z",
            "created": "2016-06-18T20:59:38.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 385,
            "birthdate": "2016-03-24",
            "updated": "2017-04-16T07:42:17.000Z",
            "created": "2017-09-18T04:26:56.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 386,
            "birthdate": "2016-07-02",
            "updated": "2016-03-17T11:09:06.000Z",
            "created": "2017-10-11T15:31:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 387,
            "birthdate": "2016-05-21",
            "updated": "2017-02-05T20:27:19.000Z",
            "created": "2017-08-11T18:56:15.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 388,
            "birthdate": "2017-02-21",
            "updated": "2017-10-20T09:46:31.000Z",
            "created": "2016-05-17T15:23:41.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 389,
            "birthdate": "2017-01-13",
            "updated": "2017-02-24T20:12:48.000Z",
            "created": "2017-10-11T22:58:46.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 390,
            "birthdate": "2017-10-06",
            "updated": "2017-04-11T10:15:36.000Z",
            "created": "2017-02-23T12:00:09.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 391,
            "birthdate": "2017-06-21",
            "updated": "2016-08-25T14:30:39.000Z",
            "created": "2017-09-06T00:36:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 392,
            "birthdate": "2016-12-17",
            "updated": "2016-03-12T05:16:13.000Z",
            "created": "2017-01-19T18:36:45.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 393,
            "birthdate": "2016-01-13",
            "updated": "2017-02-22T16:15:07.000Z",
            "created": "2016-06-12T17:59:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 394,
            "birthdate": "2017-10-12",
            "updated": "2017-12-20T08:35:14.000Z",
            "created": "2017-04-03T02:44:04.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 395,
            "birthdate": "2016-04-23",
            "updated": "2017-11-06T14:55:48.000Z",
            "created": "2016-06-21T20:22:03.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 396,
            "birthdate": "2017-02-23",
            "updated": "2016-07-27T12:39:26.000Z",
            "created": "2016-08-12T05:07:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 397,
            "birthdate": "2017-02-16",
            "updated": "2016-08-02T20:54:02.000Z",
            "created": "2017-02-08T10:00:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 398,
            "birthdate": "2017-07-13",
            "updated": "2017-11-09T04:31:19.000Z",
            "created": "2017-01-07T14:38:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 399,
            "birthdate": "2017-08-22",
            "updated": "2016-01-01T15:18:40.000Z",
            "created": "2017-04-07T02:44:32.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 400,
            "birthdate": "2016-02-15",
            "updated": "2016-10-24T21:32:11.000Z",
            "created": "2016-09-05T11:48:20.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 401,
            "birthdate": "2016-11-19",
            "updated": "2017-03-22T05:24:07.000Z",
            "created": "2016-05-13T09:11:45.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 402,
            "birthdate": "2017-04-19",
            "updated": "2017-12-12T09:13:10.000Z",
            "created": "2017-03-12T01:21:47.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 403,
            "birthdate": "2017-12-26",
            "updated": "2017-10-30T23:32:46.000Z",
            "created": "2017-01-04T10:33:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 404,
            "birthdate": "2016-03-22",
            "updated": "2017-10-28T11:05:50.000Z",
            "created": "2016-12-26T13:44:41.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 405,
            "birthdate": "2016-09-04",
            "updated": "2017-08-23T00:31:50.000Z",
            "created": "2016-05-08T19:20:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 406,
            "birthdate": "2016-12-15",
            "updated": "2016-12-18T15:15:01.000Z",
            "created": "2016-03-11T12:52:33.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 407,
            "birthdate": "2017-11-21",
            "updated": "2017-09-21T13:37:52.000Z",
            "created": "2016-01-06T09:00:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 408,
            "birthdate": "2016-08-13",
            "updated": "2016-12-17T21:01:21.000Z",
            "created": "2016-08-02T07:42:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 409,
            "birthdate": "2017-03-13",
            "updated": "2016-08-15T04:10:20.000Z",
            "created": "2016-12-03T05:26:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 410,
            "birthdate": "2016-07-01",
            "updated": "2016-10-15T20:07:53.000Z",
            "created": "2017-09-02T20:33:46.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 411,
            "birthdate": "2017-10-28",
            "updated": "2017-02-25T04:42:30.000Z",
            "created": "2017-12-01T05:27:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 412,
            "birthdate": "2017-10-17",
            "updated": "2016-07-02T04:34:55.000Z",
            "created": "2017-12-20T06:50:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 413,
            "birthdate": "2017-02-08",
            "updated": "2016-11-15T14:57:54.000Z",
            "created": "2017-12-20T11:12:24.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 414,
            "birthdate": "2017-02-23",
            "updated": "2017-05-21T23:05:02.000Z",
            "created": "2017-09-10T10:49:06.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 415,
            "birthdate": "2017-03-06",
            "updated": "2017-04-02T14:23:15.000Z",
            "created": "2017-11-25T07:55:04.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 416,
            "birthdate": "2016-07-16",
            "updated": "2017-01-23T20:22:46.000Z",
            "created": "2017-07-03T05:29:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 417,
            "birthdate": "2016-07-05",
            "updated": "2016-11-24T21:49:11.000Z",
            "created": "2017-09-15T19:20:42.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 418,
            "birthdate": "2017-11-23",
            "updated": "2016-08-30T16:04:07.000Z",
            "created": "2016-02-20T03:47:43.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 419,
            "birthdate": "2016-08-21",
            "updated": "2016-06-10T16:36:19.000Z",
            "created": "2017-02-17T11:24:39.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 420,
            "birthdate": "2016-04-05",
            "updated": "2016-08-15T13:58:38.000Z",
            "created": "2016-06-23T23:04:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 421,
            "birthdate": "2016-03-27",
            "updated": "2016-07-11T20:17:20.000Z",
            "created": "2016-05-13T05:08:37.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 422,
            "birthdate": "2017-12-07",
            "updated": "2017-01-13T18:38:49.000Z",
            "created": "2016-09-22T00:36:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 423,
            "birthdate": "2017-10-19",
            "updated": "2017-04-16T11:53:00.000Z",
            "created": "2017-07-03T00:48:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 424,
            "birthdate": "2016-08-09",
            "updated": "2017-10-21T10:36:33.000Z",
            "created": "2016-10-10T19:00:49.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 425,
            "birthdate": "2016-01-07",
            "updated": "2016-10-04T03:37:37.000Z",
            "created": "2017-04-13T20:21:44.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 426,
            "birthdate": "2016-11-18",
            "updated": "2017-03-09T00:46:16.000Z",
            "created": "2017-10-04T21:01:25.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 427,
            "birthdate": "2017-09-23",
            "updated": "2016-03-10T07:18:32.000Z",
            "created": "2016-01-30T06:08:55.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 428,
            "birthdate": "2017-02-14",
            "updated": "2017-08-11T06:17:34.000Z",
            "created": "2016-10-04T07:57:24.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 429,
            "birthdate": "2016-01-09",
            "updated": "2017-10-24T04:05:30.000Z",
            "created": "2017-09-11T00:54:44.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 430,
            "birthdate": "2016-06-16",
            "updated": "2016-03-21T07:00:30.000Z",
            "created": "2017-07-28T22:31:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 431,
            "birthdate": "2016-12-09",
            "updated": "2016-07-09T22:45:20.000Z",
            "created": "2016-12-28T14:06:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 432,
            "birthdate": "2017-08-28",
            "updated": "2016-04-05T21:38:31.000Z",
            "created": "2016-04-24T15:29:19.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 433,
            "birthdate": "2016-05-25",
            "updated": "2017-06-30T08:59:17.000Z",
            "created": "2016-05-28T20:22:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 434,
            "birthdate": "2016-03-14",
            "updated": "2017-07-12T20:16:33.000Z",
            "created": "2017-01-05T10:37:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 435,
            "birthdate": "2016-01-01",
            "updated": "2016-01-15T20:10:15.000Z",
            "created": "2017-10-09T22:20:36.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 436,
            "birthdate": "2016-04-15",
            "updated": "2016-07-05T12:59:25.000Z",
            "created": "2017-09-07T22:23:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 437,
            "birthdate": "2016-10-18",
            "updated": "2016-06-04T17:46:35.000Z",
            "created": "2017-10-16T12:08:24.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 438,
            "birthdate": "2017-08-20",
            "updated": "2016-07-19T03:36:48.000Z",
            "created": "2016-05-17T21:38:41.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 439,
            "birthdate": "2017-02-01",
            "updated": "2017-05-27T07:50:50.000Z",
            "created": "2016-08-19T00:36:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 440,
            "birthdate": "2016-02-16",
            "updated": "2017-01-14T02:40:33.000Z",
            "created": "2017-11-10T22:06:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 441,
            "birthdate": "2016-02-17",
            "updated": "2017-08-12T22:16:17.000Z",
            "created": "2017-03-06T04:44:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 442,
            "birthdate": "2016-08-10",
            "updated": "2017-09-20T05:04:20.000Z",
            "created": "2016-07-08T08:12:50.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 443,
            "birthdate": "2016-07-03",
            "updated": "2017-10-01T11:56:18.000Z",
            "created": "2017-09-26T20:39:13.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 444,
            "birthdate": "2016-07-28",
            "updated": "2016-06-10T09:44:33.000Z",
            "created": "2017-05-13T06:03:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 445,
            "birthdate": "2017-02-02",
            "updated": "2017-10-10T04:13:16.000Z",
            "created": "2017-06-05T14:42:27.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 446,
            "birthdate": "2016-07-24",
            "updated": "2017-06-09T12:11:46.000Z",
            "created": "2016-02-28T12:14:53.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 447,
            "birthdate": "2017-12-25",
            "updated": "2016-07-14T05:23:20.000Z",
            "created": "2017-11-11T05:15:56.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 448,
            "birthdate": "2016-04-10",
            "updated": "2017-08-20T19:31:38.000Z",
            "created": "2017-04-11T13:50:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 449,
            "birthdate": "2017-08-20",
            "updated": "2016-01-15T11:34:38.000Z",
            "created": "2017-06-25T07:21:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 450,
            "birthdate": "2017-04-01",
            "updated": "2017-02-14T05:59:32.000Z",
            "created": "2017-12-20T18:33:56.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 451,
            "birthdate": "2017-05-26",
            "updated": "2016-11-14T12:22:06.000Z",
            "created": "2017-08-11T10:41:40.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 452,
            "birthdate": "2016-09-02",
            "updated": "2017-10-22T23:12:43.000Z",
            "created": "2017-05-20T10:51:17.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 453,
            "birthdate": "2016-04-07",
            "updated": "2017-12-16T12:46:13.000Z",
            "created": "2017-10-28T09:59:56.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 454,
            "birthdate": "2016-08-19",
            "updated": "2017-08-07T19:31:56.000Z",
            "created": "2017-05-05T11:33:58.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 455,
            "birthdate": "2016-05-13",
            "updated": "2016-05-19T14:48:07.000Z",
            "created": "2017-12-05T04:18:57.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 456,
            "birthdate": "2016-08-17",
            "updated": "2016-10-02T16:44:56.000Z",
            "created": "2017-01-20T06:23:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 457,
            "birthdate": "2017-05-21",
            "updated": "2017-01-03T12:55:35.000Z",
            "created": "2017-09-29T22:56:38.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 458,
            "birthdate": "2017-01-10",
            "updated": "2017-06-22T10:21:27.000Z",
            "created": "2017-08-03T18:59:34.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 459,
            "birthdate": "2017-06-08",
            "updated": "2016-12-04T19:11:38.000Z",
            "created": "2017-05-28T06:28:54.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 460,
            "birthdate": "2017-05-17",
            "updated": "2016-09-27T10:44:19.000Z",
            "created": "2017-05-25T10:58:16.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 461,
            "birthdate": "2016-09-17",
            "updated": "2017-10-18T10:48:47.000Z",
            "created": "2017-10-11T14:44:21.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 462,
            "birthdate": "2016-02-18",
            "updated": "2016-07-22T08:15:54.000Z",
            "created": "2017-02-25T09:09:27.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 463,
            "birthdate": "2016-04-29",
            "updated": "2016-08-17T11:35:27.000Z",
            "created": "2016-07-16T01:33:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 464,
            "birthdate": "2017-06-19",
            "updated": "2017-07-11T05:41:17.000Z",
            "created": "2016-10-26T16:35:11.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 465,
            "birthdate": "2016-09-11",
            "updated": "2017-05-01T09:34:47.000Z",
            "created": "2016-09-06T18:04:50.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 466,
            "birthdate": "2016-10-07",
            "updated": "2016-09-26T12:12:02.000Z",
            "created": "2016-10-05T17:49:22.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 467,
            "birthdate": "2017-12-10",
            "updated": "2017-07-03T08:37:54.000Z",
            "created": "2017-09-07T08:27:08.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 468,
            "birthdate": "2016-12-16",
            "updated": "2016-09-06T08:45:45.000Z",
            "created": "2017-03-27T09:54:14.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 469,
            "birthdate": "2016-05-27",
            "updated": "2016-06-18T03:37:33.000Z",
            "created": "2016-12-02T15:47:24.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 470,
            "birthdate": "2016-10-13",
            "updated": "2017-01-31T21:17:27.000Z",
            "created": "2016-10-04T01:43:18.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 471,
            "birthdate": "2017-05-04",
            "updated": "2017-06-07T01:02:04.000Z",
            "created": "2017-02-21T08:46:28.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 472,
            "birthdate": "2017-01-13",
            "updated": "2016-04-05T10:10:07.000Z",
            "created": "2016-04-20T12:26:51.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 473,
            "birthdate": "2017-11-15",
            "updated": "2016-12-27T00:28:00.000Z",
            "created": "2016-06-09T19:22:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 474,
            "birthdate": "2017-02-03",
            "updated": "2016-02-28T04:06:58.000Z",
            "created": "2016-05-17T06:35:24.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 475,
            "birthdate": "2016-10-12",
            "updated": "2017-08-04T13:09:12.000Z",
            "created": "2016-03-07T03:51:24.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 476,
            "birthdate": "2016-08-29",
            "updated": "2016-02-15T02:33:35.000Z",
            "created": "2016-10-09T14:46:43.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 477,
            "birthdate": "2017-10-11",
            "updated": "2017-11-18T15:51:35.000Z",
            "created": "2017-08-28T19:18:00.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 478,
            "birthdate": "2016-03-29",
            "updated": "2016-12-21T23:59:29.000Z",
            "created": "2016-03-08T00:16:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 479,
            "birthdate": "2017-10-04",
            "updated": "2016-11-11T15:25:16.000Z",
            "created": "2016-04-14T16:48:59.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 480,
            "birthdate": "2016-12-06",
            "updated": "2016-07-31T07:59:24.000Z",
            "created": "2016-01-27T01:16:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 481,
            "birthdate": "2017-07-03",
            "updated": "2017-11-14T04:29:28.000Z",
            "created": "2016-01-22T15:15:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 482,
            "birthdate": "2016-11-17",
            "updated": "2016-06-16T07:47:44.000Z",
            "created": "2017-08-15T17:24:49.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 483,
            "birthdate": "2017-05-12",
            "updated": "2016-02-26T04:39:26.000Z",
            "created": "2017-03-14T01:45:16.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 484,
            "birthdate": "2017-05-31",
            "updated": "2017-08-10T18:41:21.000Z",
            "created": "2016-08-04T16:37:33.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 485,
            "birthdate": "2017-01-01",
            "updated": "2016-05-17T07:32:05.000Z",
            "created": "2017-06-23T02:52:46.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 486,
            "birthdate": "2017-11-13",
            "updated": "2016-06-13T07:50:54.000Z",
            "created": "2016-07-16T21:51:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 487,
            "birthdate": "2017-05-19",
            "updated": "2016-08-28T13:19:42.000Z",
            "created": "2017-11-17T01:49:31.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 488,
            "birthdate": "2017-04-20",
            "updated": "2016-11-21T20:21:04.000Z",
            "created": "2017-07-26T03:00:23.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 489,
            "birthdate": "2017-09-17",
            "updated": "2016-02-29T06:49:14.000Z",
            "created": "2016-07-23T13:59:20.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 490,
            "birthdate": "2017-11-09",
            "updated": "2017-10-04T20:30:37.000Z",
            "created": "2016-12-12T15:40:35.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 491,
            "birthdate": "2016-10-21",
            "updated": "2016-07-22T00:10:47.000Z",
            "created": "2017-04-15T15:13:49.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 492,
            "birthdate": "2016-12-08",
            "updated": "2016-10-15T07:03:54.000Z",
            "created": "2017-05-29T14:21:15.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 493,
            "birthdate": "2016-04-24",
            "updated": "2017-04-29T06:29:50.000Z",
            "created": "2016-10-09T19:09:26.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 494,
            "birthdate": "2016-08-23",
            "updated": "2016-05-29T19:08:47.000Z",
            "created": "2017-10-11T12:15:29.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 495,
            "birthdate": "2017-06-04",
            "updated": "2017-03-21T07:42:40.000Z",
            "created": "2017-05-08T06:22:20.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 496,
            "birthdate": "2017-09-03",
            "updated": "2017-07-10T20:11:53.000Z",
            "created": "2017-08-04T23:02:39.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 497,
            "birthdate": "2017-03-16",
            "updated": "2016-03-05T19:45:44.000Z",
            "created": "2017-04-26T13:17:05.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 498,
            "birthdate": "2017-11-03",
            "updated": "2016-01-11T00:56:00.000Z",
            "created": "2017-12-27T14:23:10.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 499,
            "birthdate": "2017-10-05",
            "updated": "2017-07-26T06:48:01.000Z",
            "created": "2017-01-23T06:51:40.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        },
        {
            "id": 500,
            "birthdate": "2017-11-21",
            "updated": "2016-09-26T00:58:55.000Z",
            "created": "2016-11-18T00:02:28.000Z",
            "lunchtime": "2016-02-24T00:52:00.000Z",
            "self-closing": true
        }
    ]




    sync.dataStore.save('product', sampleProduct);
    sync.dataStore.save('warehouses', sampleWarehouse);
    sync.dataStore.save('invoice_line_item', sampleInvoiceLineItem);
    sync.dataStore.save('customer', sampleCustomer);
    sync.dataStore.save('stocks', sampleStock);
    sync.dataStore.save('invoice', sampleInvoice);
    sync.dataStore.save('timezone_check', sampleTimeZonecheck);

}

function incrSync(sync) {
    console.log('Service action run');
}

integration.define({
    synchronizations: [
        {
            name: 'SyncChanges',
            fullSyncFunction: fullSync,
            incrementalSyncFunction: incrSync,
        },
    ],
    actions: [
        {
            name: 'Invoice Paid',
            parameters: [
                {
                    name: 'Invoice ID',
                    type: 'LONG',
                    required: false,
                }
            ],
            function: approveDenyRequisition,
        },
    ],

    'model': {
        "tables": [
            {
                name: 'customer',
                columns: [
                    {
                        name: 'customer_id',
                        type: 'LONG',
                        primaryKey: true,
                    },
                    {
                        name: 'company_name',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'contact_first_name',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'contact_last_name',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'phone_number',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'address_line_1',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'email',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'city',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'zip',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'postalcode',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'country',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'selfie',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                ],
            },
            {
                name: 'invoice',
                columns: [
                    {
                        name: 'invoice_id',
                        type: 'LONG',
                        primaryKey: true,
                    },
                    {
                        name: 'customer_id',
                        type: 'LONG',
                        primaryKey: false,
                    },
                    {
                        name: 'invoice_num',
                        type: 'STRING',
                        length: 256,
                        primaryKey: false,
                    },
                    {
                        name: 'invoice_date',
                        type: 'DATE',
                        primaryKey: false,
                    },
                    {
                        name: 'payment_status',
                        type: 'BOOLEAN',
                        primaryKey: false,
                    },
                ],
            },
            {
                name: 'invoice_line_item',
                columns: [
                    {
                        name: 'item_id',
                        type: 'LONG',
                        primaryKey: true,
                    },
                    {
                        name: 'invoice_id',
                        type: 'LONG',
                        primaryKey: false,
                    },
                    {
                        name: 'invoice_item_number',
                        type: 'LONG',
                        primaryKey: false,
                    },
                    {
                        name: 'product_id',
                        type: 'LONG',
                        primaryKey: false,
                    },
                    {
                        name: 'quantity',
                        type: 'LONG',
                        primaryKey: false,
                    },
                    {
                        name: 'cost',
                        type: 'DOUBLE',
                        primaryKey: false,
                    },
                    {
                        name: 'discount',
                        type: 'DOUBLE',
                        primaryKey: false,
                    },
                ],
            },
            {
                name: 'product',
                columns: [
                    {
                        name: 'product_id',
                        type: 'LONG',
                        primaryKey: true,
                    },
                    {
                        name: 'name',
                        type: 'STRING',
                        primaryKey: false,
                        length: 20
                    },
                    {
                        name: 'description',
                        type: 'STRING',
                        primaryKey: false,
                        length: 5000
                    },
                    {
                        name: 'cost',
                        type: 'DOUBLE',
                        primaryKey: false,
                    },
                ],
            },
            {
                name: 'stocks',
                columns: [
                    {
                        name: 'stock_id',
                        type: 'LONG',
                        primaryKey: true,
                    },
                    {
                        name: 'product_id',
                        type: 'LONG',
                        primaryKey: false,
                    },
                    {
                        name: 'warehouse_id',
                        type: 'INTEGER',
                        primaryKey: false,
                    },
                    {
                        name: 'quantity',
                        type: 'LONG',
                        primaryKey: false,
                    },
                ],
            },
            {
                name: 'timezone_check',
                columns: [
                    {
                        name: 'id',
                        type: 'LONG',
                        primaryKey: true,

                    },
                    {
                        name: 'birthdate',
                        type: 'DATE',
                        primaryKey: false,
                    },
                    {
                        name: 'updated',
                        type: 'DATETIME',
                        primaryKey: false,

                    },
                    {
                        name: 'created',
                        type: 'DATETIME',
                        primaryKey: false,

                    },
                    {
                        name: 'lunchtime',
                        type: 'DATETIME',
                        primaryKey: false,

                    },
                    {
                        name: 'info',
                        type: 'STRING',
                        primaryKey: false,
                        length: 30

                    },
                ],
            },
            {
                name: 'warehouses',
                columns: [
                    {
                        name: 'warehouse_id',
                        type: 'INTEGER',
                        primaryKey: true,
                    },
                    {
                        name: 'title',
                        type: 'STRING',
                        primaryKey: false,
                        length: 256
                    },
                    {
                        name: 'location',
                        type: 'STRING',
                        primaryKey: false,
                        length: 256

                    },
                    {
                        name: 'note',
                        type: 'STRING',
                        primaryKey: false,
                        length: 256

                    },
                ],
            },
        ],
        "relationships": [
            {
                "name": 'invoice_customer_id',
                "primaryTable": 'customer',
                "foreignTable": 'invoice',
                "columnPairs": [
                    {
                        "primaryKey": "customer_id",
                        "foreignKey": "customer_id",
                    },
                ],
            },
            {
                "name": 'invoice_line_invoice_id',
                "primaryTable": 'invoice',
                "foreignTable": 'invoice_line_item',
                "columnPairs": [
                    {
                        "primaryKey": 'invoice_id',
                        "foreignKey": 'invoice_id',
                    },
                ],
            },
            {
                "name": 'invoice_line_product_id',
                "primaryTable": 'product',
                "foreignTable": 'invoice_line_item',
                "columnPairs": [
                    {
                        "primaryKey": 'product_id',
                        "foreignKey": 'product_id',
                    },
                ],
            },
            {
                "name": 'stocks_product_id',
                "primaryTable": 'product',
                "foreignTable": 'stocks',
                "columnPairs": [
                    {
                        "primaryKey": 'product_id',
                        "foreignKey": 'product_id',
                    },
                ],
            },
            {
                "name": 'stocks_warehouse_id',
                "primaryTable": 'warehouses',
                "foreignTable": 'stocks',
                "columnPairs": [
                    {
                        "primaryKey": 'warehouse_id',
                        "foreignKey": 'warehouse_id',
                    },
                ],
            },
        ],
    },
});

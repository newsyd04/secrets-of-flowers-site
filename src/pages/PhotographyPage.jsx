"use client";
import React from "react";

export default function PhotographyPage() {
  const Artworks = [
    { id: 1, title: "Piece One", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472073110_609850394905340_3812544683904187774_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xIHMRnTlLVEQ7kNvgHenfNX&_nc_oc=AdjgQ2JRrlsJ-IS-cCY6PKAusV_BFkFnhV_AA4PG5n8l84RspM7mUGG3zbCXwk87Tg0&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AqzkAmZ-FQCcTZpvgVsXvih&oh=00_AYCFBJ6UvPlRfSP0g-ky4OLqQKvP1eqZ8CF5q_mmS20vug&oe=67B8F180"},
    { id: 2, title: "Piece Two", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472009863_609850488238664_7626423471698638960_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cTOQB07j9_IQ7kNvgF1wF2J&_nc_oc=Adg8y0iHFH6KhxYxkx8HuYw7jHMG3QzdB6qMsbqSXrLreQVSsN2IzdQj3rXPOnMsta8&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AyFL37z73fmySak9YJiv1Ax&oh=00_AYCHYT5VvNmvLy8mhK7WnLGoF4xurlTw8QeKdMEZz4zang&oe=67B8E671"},
    { id: 3, title: "Piece Three", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/472344881_609850328238680_9187356375741807214_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=eEfmoY0o8PIQ7kNvgE7OmEb&_nc_oc=AdgYtmGqfPxdf7ji6jm9jdkaqvLwEO1uQe5RGNgSYdMdaBrOsnKpGNghr7XMOQIyIHU&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AzMZocjUNRELYdNesHleU10&oh=00_AYDFKDkJCF7ceOh1nomvSN5aeFZIOXNaj39uIytq--IReg&oe=67B8E48F"},
    { id: 4, title: "Piece Four", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/471982962_608613285029051_6560488099482937522_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=dg4aUyRqEfsQ7kNvgHtW078&_nc_oc=AdgzoLUQcBLgLQdf967VDvxyDTHDAM0j8BCI-d14JzvoOwoZb0pqEc3gNEzsX6R-3Ok&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=Ae6zCDS7AmnjqTVPBplnuyN&oh=00_AYBXfXldpjBI5JCNDlJdNjAtlafz92t0rWWpYh3StvxW3g&oe=67B8C95B"},
    { id: 5, title: "Piece Five", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469782940_593872723169774_316297833363225326_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_yw0ikC3OjUQ7kNvgGt-h6t&_nc_oc=AdhPH84eMWZtq5Pld8-D8DrjmEdqbdvrPcvn90npthakjE22T8YRjZ5LRO53xfzi0Ho&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=ASIDsb06lgwRU2gBtDoRDGA&oh=00_AYD4bDhLO4yBkE_fF30wgIhiVXoiWIkaNQVN_x7WLpkCxw&oe=67B8CBA9"},
    { id: 6, title: "Piece Six", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469674226_593872699836443_3101694845274772435_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=XP0WibmS7A8Q7kNvgGWRCnT&_nc_oc=AdiuQmuSpfTgBpEjXNZ73HBrlXcftqIg4VOeGmZXurBQjlDQWB1mxAtBU5U3Ay5bVUE&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=Avayy8_cBkcE9gfJjK0MHfi&oh=00_AYCG5JHGOXioZiMwvUlsnaS8Oy9DTP8uCu3r8f1h6GQPIA&oe=67B8EA31"},
    { id: 7, title: "Piece Seven", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469793295_593872683169778_2272373768488541265_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=8yJTabpS-3IQ7kNvgHYrzmz&_nc_oc=AdhRFHzYJU4kVFF_d6f5vhunCNpDLZyHIOXJjDuFHPUD1O_mZl2yRSJ4KMUOOjZL_3w&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=ABg0KObhUvTElBKpE-ybTBH&oh=00_AYCcrZ3t8DyXNZkr8qkwtK2Ic_TVAYN6D2pzBKg57XcQxg&oe=67B8F3FA"},
    { id: 8, title: "Piece Eight", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469797155_593872653169781_8561879566421109255_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=EDap--NH_30Q7kNvgGHl_dT&_nc_oc=AdiLTiAOPHAOXQQexa34MmAPnKEBIYdUlAU5Mr7n5EitoqwQkWkehY1Ws0mByV9x5RY&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=ASsyzwIzTH8cnyIz7fs5J4V&oh=00_AYD3mW0KkQEetUprlZy1bOM1H5ozm4d-xFiUf969wFoApw&oe=67B8EDCF"},
    { id: 1, title: "Piece One", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469672545_593872633169783_8610744027743021529_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9D_IqtzgtIQQ7kNvgHXF-uw&_nc_oc=AdgfpThgsvJqkIS6P0BpoyCompoNMkmRXhoDVR1uQz0bHOko0rXbAQGKdHl-hzWL6oo&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=A1Ks6tJvzIjxc51V-EkuiM6&oh=00_AYCE6G9pcv5mpxLPvYU92EjUCGhmTF0TlCvoVggKliYOKA&oe=67B8C941"},
    { id: 2, title: "Piece Two", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469797298_593872613169785_1659595361160653477_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Fq78EvuPDaIQ7kNvgEgikcf&_nc_oc=Adi6ODbMruqvzPNzhawHYvCUrVIm0n7T2lTsK4ZA2SJ5DvmtPb6it4y1Uu80arDXM-k&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AiEJATsVHsvF451wFsmmkM2&oh=00_AYDNClU0jVWqbxnxG5hJhgju6jBr8eCp1yOV6M1nGxaNsA&oe=67B8C993"},
    { id: 3, title: "Piece Three", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469683835_593872589836454_3541545932498257025_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=biZVGD_2zR8Q7kNvgFyj9ai&_nc_oc=Adhwdxn7EDgOvS4TAm1JMHQoKXvYtEswLG2GxR0b-FzF5gAUPE6VttI4rwO4kstFCVI&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AeAJhDnyQ6nwCep0rK5tZcs&oh=00_AYBZDqZasy2cupiHkYmCy6Kjnoww4Ec3ipiIFxvP24CwRw&oe=67B8EC37"},
    { id: 4, title: "Piece Four", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469877016_593872569836456_6774562021543480862_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=L3VIVQhyrIQQ7kNvgFOlfxx&_nc_oc=AdiSN2ROG2O1Jon6SPcanj_nsDriQerNUz7YZg-Ss3r6G0bFeRLXZkbPSSHXy1UlS0s&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=Ah0QWXNCezjKWa-YnkdD_qS&oh=00_AYDNv9rb40AF1xWsb9vYAsNDM-88TYr9UAHmUimfxxGX3g&oe=67B8EED6"},
    { id: 5, title: "Piece Five", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469589632_593872546503125_3485707559731356287_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=3gE__pGruKQQ7kNvgHxb_yu&_nc_oc=AdhMtIfu6Mg8_Grz64imY0RilQmi1YMDB7yPIywDGsMJKztwxZhWQh_umNm9o1YItWE&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AEI76py18un7yN7B8cM7hAu&oh=00_AYDAjekU_V2BCPzY0HOCytKVgweZfSDjtP9vwhAnwLyO9Q&oe=67B8F247"},
    { id: 6, title: "Piece Six", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469798442_593872526503127_2469137829167803552_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=jQ33UumAcW8Q7kNvgFV8zDZ&_nc_oc=AdjEXl1V6DURiYWa31rluX2QjswUJy_lbU6kYZu0OjipaAOi_Vf3rpmKyCLkwnjntBM&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AJUKg6gnY69e-n-Dr3f8VG6&oh=00_AYDUyqlSGUnaCeGkaGYhsz7wO3kZ-iSkPNJnh_kqHaptcQ&oe=67B8E783"},
    { id: 7, title: "Piece Seven", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469560772_593872406503139_8155691571453983163_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=vOkg5rli-QgQ7kNvgHvrqYB&_nc_oc=AdhqpaLa9Mlx78joQLAzG2lEpthy3zP7p4lzwpQcasaRUUCBU5XEbB9n8FFh9RcSSL8&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AQkjfnVKR4EvRTcpEc7UVTL&oh=00_AYB-FheAKtG5eGf9cyhU_OTlX5XXV0JjTiD67_qSBuiTxw&oe=67B8D8B3"},
    { id: 8, title: "Piece Eight", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469674654_593872379836475_2386032935471908580_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Tk_4BY6JzMQQ7kNvgG64UyU&_nc_oc=AdiI59WYH9wp-MsXZ3CuTyHPb9SMXogpa5upa1x4cj1BPAUtbhWWJ1GPtM6LEAKo_Nc&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AdDdWiz0TRsuIoVGb6NUbdN&oh=00_AYBDqeLUbZeBDWxn2o1mdizDisVMNedlfhjWLqer1nsVmg&oe=67B8C4B6"},
    { id: 1, title: "Piece One", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469676832_593872353169811_6345997465105165188_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=lbtOHDANrd0Q7kNvgH3Z-aO&_nc_oc=Adi1cG2WsKhCaWzBw3k7IfC7MbrkXBfyVilmp92DaTkYbVpTydWNCejPE3EWADTheeU&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AcnT6MQR3sHGfTW7dqwgTXk&oh=00_AYAziLiTRISuQ5lgDqNZTJvif5GPxC0WdxRdbBcJ-Z5CXw&oe=67B8D20F"},
    { id: 2, title: "Piece Two", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469798306_593872229836490_6873168516447776579_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ffH87WwdsXIQ7kNvgHC3n5A&_nc_oc=AdhFswuLt_1Z0zHWS5LExI5l-viQ1xnVirSQybUbGeLOSspy-rrCk2Z3tY6u0AWaQdM&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AVlCJYtNcMT42b79IfIloDn&oh=00_AYA_1l9USRhEqk8k91w7wPpt99pKxs8nD6aA7D1MmH0rMw&oe=67B8F0D5"},
    { id: 3, title: "Piece Three", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/469674234_593872209836492_6187450162073238001_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=aCo-r4Xn6iIQ7kNvgHFL1PY&_nc_oc=AdhsG9SkOdcV9g1NeCwn4Ov1q1A7hPeqmBF2NsFO5gCl8gu1qNneOxKOMlp2Jwv1mPQ&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=A7ytCpgI2oVhV61XUghQpTg&oh=00_AYDp_qv4AxaOO0I0YcUA8wi8dHMwQuNHjmoSybaakyTD_g&oe=67B8DA18"},
    { id: 4, title: "Piece Four", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/468489848_585010194056027_6872024999292293813_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=L9Ny6TiF2nMQ7kNvgFy-NKS&_nc_oc=AdgZZiD12a5hwHpiIhseimWi7RcJc85y7g-TYtLTJ4NF4SM8VGNM0YFgS_T5-2RZXVs&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AL51ALW05hqWp2MFYr0ONzt&oh=00_AYBrE0eN8BGgwKCvjSSw_sDNniqsyJO_7TEQto_j1ukJKA&oe=67B8CA25"},
    { id: 5, title: "Piece Five", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/468320456_585010180722695_8656218028911103459_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=1ET9U29lsAMQ7kNvgEhMesU&_nc_oc=Adig-ETrCg4rFrwSjYQs3dOMGeyMtg_gFvoZnphnFmBT3YkCXera6PggHnHiWd0i_mo&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=ABOkysR5kgbcxcUOUj0aJL9&oh=00_AYDfs01bUyurW8fJ1lTQwQC_uejv02cMJ8QY8ZkgsrkHsA&oe=67B8D8F1"},
    { id: 6, title: "Piece Six", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/468354617_585010150722698_5102590807566478913_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=DafzInrRbkkQ7kNvgFoc57n&_nc_oc=AdiubwJCfgB6N97zUmNCj6VrGm3vf_NVwL0QptxnP1GEi9QZabR010rIsWEaas0vwxY&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AuRR7z3vXvKY7mh8JuBmG_2&oh=00_AYDQiTxlALqsuhHrsBjynM-1vWqxi1TpvFEodFXGd7i1DQ&oe=67B8DDEC"},
    { id: 7, title: "Piece Seven", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/468364783_585010134056033_874435193056114807_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=fAITN2ocV3AQ7kNvgED1xRk&_nc_oc=Adg6Mn_9gbgX8Rl5KvKge7KnDaH2zuw1FQEwLDLe3UZmtnFQYTywWC3GJ_Znm099Py0&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=Aew3gWLX_68npxKYGeNX3El&oh=00_AYDFWGCJq53eAp5vlZKoZXg09g8Xzz7SwG2laSpuqkYLuA&oe=67B8C65A"},
    { id: 8, title: "Piece Eight", image: "https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/468399969_585010097389370_3505375592872406231_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ze-5qSFaD1kQ7kNvgEHBVw4&_nc_oc=Adh_c0pv6aIsWSkF6unewm73xqpuzsPlRB79dr19Caa1c1U02uKbrDKJ3RSh4OfCCx0&_nc_zt=23&_nc_ht=scontent-dub4-1.xx&_nc_gid=AsEGlSqLVLDe2N5WjFxfr4D&oh=00_AYCnVAg-v9HFShZ8wVda8V7CVN6E2C5PUOwUvvJlTrzccg&oe=67B8DF91"},
  ];

  return (
    <div className="min-h-screen py-48 font-quicksand bg-[#abbd9a]">
      
      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-5xl text-white font-bold">Photography Portfolio</h1>
        <hr className="w-32 mt-6 mx-auto mb-8 border-t-4 border-gray-400 opacity-75" />
        <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mt-4">
          A curated collection of my favorite photographs capturing nature, moments, and memories.
        </p>
      </div>

      {/* Masonry Grid Artworks Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(100px,_auto)] gap-4">
          {Artworks.map((piece) => (
            <div key={piece.id} className="relative">
              
              {/* Image */}
              <div className="relative group">
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="w-full h-auto object-contain rounded-xl shadow-md"
                />

                {/* Hover Overlay - Only Over Image */}
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center p-2 items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                  <h2 className="text-2xl font-bold">{piece.title}</h2>
                </div>
              </div>
              
              {/* No Overlay Here - Details Are Hidden by Default */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/navbar";

const inter = Josefin_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex h-screen flex-col items-center bg-white text-black ${inter.className}`}
    >
        <Navbar />

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore dolore, tempora in temporibus quaerat porro soluta cum ab blanditiis eaque aperiam voluptatum. Sunt tempore eligendi, error saepe inventore excepturi atque!
        Laboriosam voluptas quisquam nihil ipsum, libero commodi sequi rem natus, laudantium maxime a id placeat. In, architecto. Vero eaque possimus explicabo, perspiciatis minus totam excepturi? Impedit deleniti odio obcaecati amet.
        Sapiente officiis labore, ad eaque minus magnam neque illo quod modi sint fugit autem omnis necessitatibus est deleniti voluptas nobis, asperiores nihil! Rem ratione culpa odio voluptates ipsum ipsa consectetur.
        Corrupti temporibus deserunt ut quod libero illum. Aut nihil commodi veniam velit magni laborum unde animi non dignissimos laudantium molestiae praesentium porro qui omnis, corporis illum explicabo pariatur dolor voluptatibus?
        Mollitia provident autem quas ipsam quia cumque, magni quis officiis eius tenetur repudiandae impedit. Dolorum blanditiis magnam reiciendis explicabo mollitia. Sapiente voluptas sint fuga veniam, eaque magnam quos inventore optio.
        Quod rem sapiente placeat esse asperiores illum et beatae in optio ipsam autem voluptatum sequi, sunt debitis id veniam fugiat! Dolore beatae architecto fugit obcaecati deleniti dolores quos quam quo!
        Magni fugiat iusto eum consequuntur quidem deleniti porro non consectetur alias aspernatur! Saepe sit numquam rem illum quasi earum amet eveniet debitis porro soluta fugiat, ab modi sed dolorem ipsam.
        Eveniet dolorem reiciendis ipsa, magni unde, omnis qui sequi expedita ducimus optio eius molestias, neque harum repellat? Illo omnis, libero atque adipisci nemo voluptates. Reprehenderit vero tempora accusamus in necessitatibus!
        Ipsum deleniti itaque perferendis nemo placeat ipsam aspernatur ab odit, voluptas in ut, nam nobis neque eveniet fugit tenetur earum sit, error odio debitis sunt? Sed repudiandae ad consectetur provident.
        Animi voluptatum vitae et dolorum ab minus omnis consectetur quos, temporibus eius asperiores vero explicabo odio, quo ipsa. Explicabo nobis consequuntur velit necessitatibus eligendi officia id et deleniti, eaque hic.</p>
    </main>
  );
}

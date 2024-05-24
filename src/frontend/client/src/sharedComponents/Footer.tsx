import { SchoolConfig } from '../types/types';

export default function Footer({
  schoolConfig,
}: {
  schoolConfig: SchoolConfig;
}) {
  return (
    <div style={{ backgroundColor: schoolConfig.footer_color }}>
      <footer className="text-center text-lg-start text-muted">
        <section className="border-t">
          <div className="container mx-auto text-center text-md-start mt-5">
            <div className="flex flex-wrap mt-3">
              <div className="w-full md:w-3/12 lg:w-4/12 xl:w-3/12 mb-4 mx-auto">
                <h6 className="uppercase font-bold mb-4 flex items-center justify-center md:justify-start">
                  <i className="fas fa-gem mr-3"></i>
                  Little Ram Pantries
                </h6>
                <p>
                  The students of Multi-24-620 would like to thank you for
                  visiting our capstone project!
                </p>
              </div>

              <div className="w-full md:w-3/12 lg:w-2/12 xl:w-2/12 mb-4 mx-auto">
                <h6 className="uppercase font-bold mb-4">Useful links</h6>
                <p>
                  <a href={schoolConfig.path} className="text-reset">
                    VCU Ram Pantry
                  </a>
                </p>
                <p>
                  <a
                    href="https://news.vcu.edu/article/2021/10/little-ram-pantries-will-provide-emergency-food-assistance-to-vcu-students"
                    className="text-reset"
                  >
                    Learn Our Story
                  </a>
                </p>
                <p>
                  <a
                    href="https://news.vcu.edu/article/2023/10/marking-its-first-decade-ram-pantry-continues-serving-food-insecure-students-at-vcu"
                    className="text-reset"
                  >
                    See The Research
                  </a>
                </p>
              </div>

              <div className="w-full md:w-4/12 lg:w-3/12 xl:w-3/12 mb-4 mx-auto">
                <h6 className="uppercase font-bold mb-4">Contact</h6>
                <p className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-home mr-2"></i>
                  {schoolConfig.contact.address}
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-envelope mr-3"></i>
                  {schoolConfig.contact.email}
                </p>
                <p className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-phone mr-3"></i>
                  {schoolConfig.contact.phone}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          © 2023 Copyright: Little Ram Pantries
        </div>
      </footer>
    </div>
  );
}

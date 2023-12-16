import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer () {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='border-top'>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Little Ram Pantries
              </h6>
              <p>
                The students of Multi-24-620 would like to thank you for visiting our capstone project! 
              </p>
              <p>
                We would also like to thank Dr. Daniel Cranston, Dr. Supriyo Bandyoopadhyay, Dr. John Jones, 
                Lauren Linkous, and Lisa Matthews-Alisworth
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Learn Our Story 
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                    VCU Ram Pantry
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                    See The Research
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                930 W Grace St, Richmond, VA 23220
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                rampantry@vcu.edu
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +1 (804)-828-4514 
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: Little Ram Pantries
      </div>
    </MDBFooter>
  );
}

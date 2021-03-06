// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: customminter/tx.proto

package types

import (
	context "context"
	fmt "fmt"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type MsgMint struct {
	Creator          string `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	TokenName        string `protobuf:"bytes,2,opt,name=tokenName,proto3" json:"tokenName,omitempty"`
	Quantity         uint64 `protobuf:"varint,3,opt,name=quantity,proto3" json:"quantity,omitempty"`
	Decimals         uint32 `protobuf:"varint,4,opt,name=decimals,proto3" json:"decimals,omitempty"`
	ReceivingAddress string `protobuf:"bytes,5,opt,name=receivingAddress,proto3" json:"receivingAddress,omitempty"`
}

func (m *MsgMint) Reset()         { *m = MsgMint{} }
func (m *MsgMint) String() string { return proto.CompactTextString(m) }
func (*MsgMint) ProtoMessage()    {}
func (*MsgMint) Descriptor() ([]byte, []int) {
	return fileDescriptor_25ba97b344e0b511, []int{0}
}
func (m *MsgMint) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgMint) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgMint.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgMint) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgMint.Merge(m, src)
}
func (m *MsgMint) XXX_Size() int {
	return m.Size()
}
func (m *MsgMint) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgMint.DiscardUnknown(m)
}

var xxx_messageInfo_MsgMint proto.InternalMessageInfo

func (m *MsgMint) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *MsgMint) GetTokenName() string {
	if m != nil {
		return m.TokenName
	}
	return ""
}

func (m *MsgMint) GetQuantity() uint64 {
	if m != nil {
		return m.Quantity
	}
	return 0
}

func (m *MsgMint) GetDecimals() uint32 {
	if m != nil {
		return m.Decimals
	}
	return 0
}

func (m *MsgMint) GetReceivingAddress() string {
	if m != nil {
		return m.ReceivingAddress
	}
	return ""
}

type MsgMintResponse struct {
	Success bool `protobuf:"varint,1,opt,name=success,proto3" json:"success,omitempty"`
}

func (m *MsgMintResponse) Reset()         { *m = MsgMintResponse{} }
func (m *MsgMintResponse) String() string { return proto.CompactTextString(m) }
func (*MsgMintResponse) ProtoMessage()    {}
func (*MsgMintResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_25ba97b344e0b511, []int{1}
}
func (m *MsgMintResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgMintResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgMintResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgMintResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgMintResponse.Merge(m, src)
}
func (m *MsgMintResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgMintResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgMintResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgMintResponse proto.InternalMessageInfo

func (m *MsgMintResponse) GetSuccess() bool {
	if m != nil {
		return m.Success
	}
	return false
}

func init() {
	proto.RegisterType((*MsgMint)(nil), "eshelB.starportminter.customminter.MsgMint")
	proto.RegisterType((*MsgMintResponse)(nil), "eshelB.starportminter.customminter.MsgMintResponse")
}

func init() { proto.RegisterFile("customminter/tx.proto", fileDescriptor_25ba97b344e0b511) }

var fileDescriptor_25ba97b344e0b511 = []byte{
	// 307 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x94, 0x91, 0x41, 0x4e, 0x02, 0x31,
	0x14, 0x86, 0xa9, 0xa0, 0x40, 0x13, 0xa3, 0x99, 0xc4, 0x64, 0x42, 0x4c, 0x43, 0x58, 0x11, 0x89,
	0x9d, 0x44, 0x0e, 0x60, 0x64, 0x8f, 0x8b, 0x89, 0x1b, 0xdd, 0x95, 0xf2, 0x32, 0x34, 0x32, 0xed,
	0xd8, 0xf7, 0xc6, 0xc0, 0x2d, 0xbc, 0x84, 0x77, 0x71, 0xc9, 0xd2, 0xa5, 0x81, 0x8b, 0x98, 0x19,
	0x18, 0xd4, 0xb8, 0x30, 0x2e, 0xff, 0xf7, 0xbf, 0xfe, 0xfd, 0xda, 0x9f, 0x9f, 0xe9, 0x1c, 0xc9,
	0xa5, 0xa9, 0xb1, 0x04, 0x3e, 0xa2, 0x85, 0xcc, 0xbc, 0x23, 0x17, 0xf4, 0x00, 0x67, 0x30, 0x1f,
	0x49, 0x24, 0xe5, 0x33, 0xe7, 0x69, 0xeb, 0xcb, 0xef, 0xcb, 0xbd, 0x57, 0xc6, 0x9b, 0x63, 0x4c,
	0xc6, 0xc6, 0x52, 0x10, 0xf2, 0xa6, 0xf6, 0xa0, 0xc8, 0xf9, 0x90, 0x75, 0x59, 0xbf, 0x1d, 0x57,
	0x32, 0x38, 0xe7, 0x6d, 0x72, 0x8f, 0x60, 0x6f, 0x55, 0x0a, 0xe1, 0x41, 0xe9, 0x7d, 0x0d, 0x82,
	0x0e, 0x6f, 0x3d, 0xe5, 0xca, 0x92, 0xa1, 0x65, 0x58, 0xef, 0xb2, 0x7e, 0x23, 0xde, 0xeb, 0xc2,
	0x9b, 0x82, 0x36, 0xa9, 0x9a, 0x63, 0xd8, 0xe8, 0xb2, 0xfe, 0x71, 0xbc, 0xd7, 0xc1, 0x05, 0x3f,
	0xf5, 0xa0, 0xc1, 0x3c, 0x1b, 0x9b, 0xdc, 0x4c, 0xa7, 0x1e, 0x10, 0xc3, 0xc3, 0x32, 0xfc, 0xd7,
	0xbc, 0x37, 0xe0, 0x27, 0x3b, 0xcc, 0x18, 0x30, 0x73, 0x16, 0xa1, 0xc0, 0xc5, 0x5c, 0xeb, 0xe2,
	0x54, 0x81, 0xdb, 0x8a, 0x2b, 0x79, 0xe5, 0x78, 0x7d, 0x8c, 0x49, 0x30, 0xe3, 0x8d, 0xf2, 0x5d,
	0x03, 0xf9, 0xf7, 0x47, 0xc8, 0x5d, 0x7a, 0x67, 0xf8, 0x8f, 0xe5, 0x0a, 0x65, 0x74, 0xff, 0xb6,
	0x16, 0x6c, 0xb5, 0x16, 0xec, 0x63, 0x2d, 0xd8, 0xcb, 0x46, 0xd4, 0x56, 0x1b, 0x51, 0x7b, 0xdf,
	0x88, 0xda, 0xc3, 0x75, 0x62, 0x68, 0x96, 0x4f, 0xa4, 0x76, 0x69, 0xb4, 0x0d, 0x8e, 0xee, 0xbc,
	0x32, 0xd6, 0xd8, 0x24, 0xaa, 0x6e, 0xb8, 0xdc, 0x15, 0xb7, 0x88, 0x7e, 0xf6, 0xb8, 0xcc, 0x00,
	0x27, 0x47, 0x65, 0x97, 0xc3, 0xcf, 0x00, 0x00, 0x00, 0xff, 0xff, 0xfd, 0x1c, 0xd2, 0xa6, 0xe4,
	0x01, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// MsgClient is the client API for Msg service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type MsgClient interface {
	Mint(ctx context.Context, in *MsgMint, opts ...grpc.CallOption) (*MsgMintResponse, error)
}

type msgClient struct {
	cc grpc1.ClientConn
}

func NewMsgClient(cc grpc1.ClientConn) MsgClient {
	return &msgClient{cc}
}

func (c *msgClient) Mint(ctx context.Context, in *MsgMint, opts ...grpc.CallOption) (*MsgMintResponse, error) {
	out := new(MsgMintResponse)
	err := c.cc.Invoke(ctx, "/eshelB.starportminter.customminter.Msg/Mint", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MsgServer is the server API for Msg service.
type MsgServer interface {
	Mint(context.Context, *MsgMint) (*MsgMintResponse, error)
}

// UnimplementedMsgServer can be embedded to have forward compatible implementations.
type UnimplementedMsgServer struct {
}

func (*UnimplementedMsgServer) Mint(ctx context.Context, req *MsgMint) (*MsgMintResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Mint not implemented")
}

func RegisterMsgServer(s grpc1.Server, srv MsgServer) {
	s.RegisterService(&_Msg_serviceDesc, srv)
}

func _Msg_Mint_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgMint)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).Mint(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/eshelB.starportminter.customminter.Msg/Mint",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).Mint(ctx, req.(*MsgMint))
	}
	return interceptor(ctx, in, info, handler)
}

var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "eshelB.starportminter.customminter.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Mint",
			Handler:    _Msg_Mint_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "customminter/tx.proto",
}

func (m *MsgMint) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgMint) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgMint) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.ReceivingAddress) > 0 {
		i -= len(m.ReceivingAddress)
		copy(dAtA[i:], m.ReceivingAddress)
		i = encodeVarintTx(dAtA, i, uint64(len(m.ReceivingAddress)))
		i--
		dAtA[i] = 0x2a
	}
	if m.Decimals != 0 {
		i = encodeVarintTx(dAtA, i, uint64(m.Decimals))
		i--
		dAtA[i] = 0x20
	}
	if m.Quantity != 0 {
		i = encodeVarintTx(dAtA, i, uint64(m.Quantity))
		i--
		dAtA[i] = 0x18
	}
	if len(m.TokenName) > 0 {
		i -= len(m.TokenName)
		copy(dAtA[i:], m.TokenName)
		i = encodeVarintTx(dAtA, i, uint64(len(m.TokenName)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgMintResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgMintResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgMintResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Success {
		i--
		if m.Success {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintTx(dAtA []byte, offset int, v uint64) int {
	offset -= sovTx(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *MsgMint) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.TokenName)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	if m.Quantity != 0 {
		n += 1 + sovTx(uint64(m.Quantity))
	}
	if m.Decimals != 0 {
		n += 1 + sovTx(uint64(m.Decimals))
	}
	l = len(m.ReceivingAddress)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	return n
}

func (m *MsgMintResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Success {
		n += 2
	}
	return n
}

func sovTx(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozTx(x uint64) (n int) {
	return sovTx(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *MsgMint) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgMint: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgMint: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TokenName", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.TokenName = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Quantity", wireType)
			}
			m.Quantity = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Quantity |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 4:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Decimals", wireType)
			}
			m.Decimals = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Decimals |= uint32(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ReceivingAddress", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ReceivingAddress = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *MsgMintResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgMintResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgMintResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Success", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				v |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			m.Success = bool(v != 0)
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipTx(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowTx
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowTx
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowTx
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthTx
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupTx
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthTx
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthTx        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowTx          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupTx = fmt.Errorf("proto: unexpected end of group")
)
